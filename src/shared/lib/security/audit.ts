/**
 * Security Audit Logging System
 * Comprehensive security event tracking with structured logging, IP reputation, and alerting
 * @module lib/security/audit
 */

import winston from 'winston';
import { Redis } from 'ioredis';
import { NextRequest } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import nodemailer from 'nodemailer';

// Types and Interfaces
interface AuditEvent {
  timestamp: string;
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string | null;
  email?: string | null;
  ipAddress: string;
  userAgent?: string | null;
  metadata?: Record<string, any>;
  status: 'success' | 'failure';
}

interface IPReputation {
  ip: string;
  score: number;
  lastEventTimestamp: string;
  failedAttempts: number;
  firstSeen: string;
  lastSeen: string;
}

interface AlertThresholds {
  failedLoginAttempts: number;
  suspiciousActivityScore: number;
  bruteForceAttempts: number;
}

// Configuration
const DEFAULT_THRESHOLDS: AlertThresholds = {
  failedLoginAttempts: 5,
  suspiciousActivityScore: 75,
  bruteForceAttempts: 10
};

const REPUTATION_DECAY_RATE = 0.95; // Decay reputation score by 5% per day
const FAILED_ATTEMPT_PENALTY = 15;
const SUCCESS_ATTEMPT_BONUS = 2;

// Logger Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/security-audit.log' })
  ],
});

/**
 * Security Audit Logger
 * Handles structured logging, IP reputation tracking, and alerting
 */
export class SecurityAuditLogger {
  private redis: Redis;
  private thresholds: AlertThresholds;
  private adminEmails: string[];
  private smtpConfig?: nodemailer.Transporter;

  constructor(
    redisClient: Redis,
    thresholds: Partial<AlertThresholds> = {},
    adminEmails: string[] = []
  ) {
    this.redis = redisClient;
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
    this.adminEmails = adminEmails;

    // Initialize SMTP if email notifications are configured
    if (process.env.SMTP_HOST) {
      this.smtpConfig = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  /**
   * Log a security event with structured format
   */
  async logEvent(event: Omit<AuditEvent, 'timestamp'>): Promise<void> {
    const timestamp = new Date().toISOString();
    const fullEvent: AuditEvent = {
      ...event,
      timestamp
    };

    // Log to Winston
    logger.log({
      level: this.getLogLevel(event.severity),
      message: `${event.eventType} - ${event.status}`,
      ...fullEvent
    });

    // Store in database
    try {
      await prisma.securityAuditLog.create({
        data: {
          timestamp: new Date(timestamp),
          eventType: event.eventType,
          severity: event.severity,
          userId: event.userId || null,
          email: event.email || null,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent || null,
          metadata: event.metadata ? JSON.stringify(event.metadata) : null,
          status: event.status,
        }
      });
    } catch (error) {
      logger.error('Failed to store audit log in database', { error });
    }

    // Update IP reputation
    await this.updateIPReputation(event.ipAddress, fullEvent);

    // Check for alert conditions
    await this.checkAlertConditions(fullEvent);
  }

  /**
   * Get Winston log level from severity
   */
  private getLogLevel(severity: AuditEvent['severity']): string {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warn';
      case 'medium': return 'info';
      case 'low': return 'debug';
      default: return 'info';
    }
  }

  /**
   * Update IP reputation based on event
   */
  private async updateIPReputation(ip: string, event: AuditEvent): Promise<void> {
    const redisKey = `ip_reputation:${ip}`;
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    try {
      const existingReputation = await this.redis.get(redisKey);
      let reputation: IPReputation;

      if (existingReputation) {
        reputation = JSON.parse(existingReputation);
        
        // Apply daily decay to reputation score
        const lastSeenDate = new Date(reputation.lastSeen).toISOString().split('T')[0];
        if (lastSeenDate !== today) {
          reputation.score = Math.max(0, reputation.score * REPUTATION_DECAY_RATE);
        }
      } else {
        // New IP
        reputation = {
          ip,
          score: 50, // Start with neutral score
          lastEventTimestamp: now.toISOString(),
          failedAttempts: 0,
          firstSeen: now.toISOString(),
          lastSeen: now.toISOString()
        };
      }

      // Update reputation based on event
      if (event.status === 'failure') {
        reputation.score = Math.max(0, reputation.score - FAILED_ATTEMPT_PENALTY);
        reputation.failedAttempts += 1;
      } else {
        reputation.score = Math.min(100, reputation.score + SUCCESS_ATTEMPT_BONUS);
      }

      reputation.lastEventTimestamp = now.toISOString();
      reputation.lastSeen = now.toISOString();

      // Store updated reputation
      await this.redis.set(redisKey, JSON.stringify(reputation));
      await this.redis.expire(redisKey, 30 * 24 * 60 * 60); // 30 days

      // Log reputation update
      logger.debug('IP reputation updated', { ip, score: reputation.score });

    } catch (error) {
      logger.error('Failed to update IP reputation', { ip, error });
    }
  }

  /**
   * Check if alert conditions are met
   */
  private async checkAlertConditions(event: AuditEvent): Promise<void> {
    const redisKey = `ip_reputation:${event.ipAddress}`;

    try {
      const reputationData = await this.redis.get(redisKey);
      if (!reputationData) return;

      const reputation: IPReputation = JSON.parse(reputationData);

      // Check failed login attempts threshold
      if (event.eventType === 'LOGIN_ATTEMPT' && event.status === 'failure') {
        if (reputation.failedAttempts >= this.thresholds.failedLoginAttempts) {
          await this.triggerAlert(
            'FAILED_LOGIN_THRESHOLD_EXCEEDED',
            `Multiple failed login attempts from IP: ${event.ipAddress}`,
            'high',
            { ...event, failedAttempts: reputation.failedAttempts }
          );
        }
      }

      // Check reputation score threshold
      if (reputation.score <= (100 - this.thresholds.suspiciousActivityScore)) {
        await this.triggerAlert(
          'SUSPICIOUS_IP_ACTIVITY',
          `Suspicious activity detected from IP: ${event.ipAddress} (Score: ${reputation.score})`,
          'medium',
          { ...event, reputationScore: reputation.score }
        );
      }

      // Check brute force attempts
      if (reputation.failedAttempts >= this.thresholds.bruteForceAttempts) {
        await this.triggerAlert(
          'BRUTE_FORCE_DETECTED',
          `Potential brute force attack from IP: ${event.ipAddress}`,
          'critical',
          { ...event, failedAttempts: reputation.failedAttempts }
        );
      }

    } catch (error) {
      logger.error('Failed to check alert conditions', { error });
    }
  }

  /**
   * Trigger an alert with notifications
   */
  private async triggerAlert(
    alertType: string,
    message: string,
    severity: AuditEvent['severity'],
    context: Record<string, any>
  ): Promise<void> {
    // Log the alert
    logger[severity === 'critical' ? 'error' : 'warn'](message, { 
      alertType,
      severity,
      context
    });

    // Store alert in database
    try {
      await prisma.securityAlert.create({
        data: {
          alertType,
          message,
          severity,
          context: JSON.stringify(context),
          timestamp: new Date(),
          resolved: false
        }
      });
    } catch (error) {
      logger.error('Failed to store security alert in database', { error });
    }

    // Send email notifications for critical alerts
    if (severity === 'critical' || severity === 'high') {
      await this.sendAdminNotifications(alertType, message, context);
    }
  }

  /**
   * Send email notifications to admins
   */
  private async sendAdminNotifications(
    alertType: string,
    message: string,
    context: Record<string, any>
  ): Promise<void> {
    if (!this.smtpConfig || this.adminEmails.length === 0) {
      logger.debug('Email notifications not configured or no admin emails provided');
      return;
    }

    try {
      const emailPromises = this.adminEmails.map(async (email) => {
        await this.smtpConfig?.sendMail({
          from: process.env.SMTP_FROM || 'security@crispy-fishstick.com',
          to: email,
          subject: `[SECURITY ALERT] ${alertType}`,
          text: `Security Alert: ${message}\n\nContext: ${JSON.stringify(context, null, 2)}`,
          html: `<h1>Security Alert: ${alertType}</h1>
                 <p><strong>Message:</strong> ${message}</p>
                 <h3>Context:</h3>
                 <pre>${JSON.stringify(context, null, 2)}</pre>
                 <p>This is an automated security notification.</p>`
        });
      });

      await Promise.all(emailPromises);
      logger.info('Admin notifications sent', { alertType, recipients: this.adminEmails.length });

    } catch (error) {
      logger.error('Failed to send admin notifications', { error });
    }
  }

  /**
   * Get IP reputation score
   */
  async getIPReputation(ip: string): Promise<IPReputation | null> {
    try {
      const reputationData = await this.redis.get(`ip_reputation:${ip}`);
      return reputationData ? JSON.parse(reputationData) : null;
    } catch (error) {
      logger.error('Failed to get IP reputation', { ip, error });
      return null;
    }
  }

  /**
   * Get client IP from request
   */
  getClientIp(req: NextRequest): string {
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const xRealIp = req.headers.get('x-real-ip');

    if (xForwardedFor) {
      return xForwardedFor.split(',')[0].trim();
    }

    if (xRealIp) {
      return xRealIp;
    }

    return 'unknown';
  }

  /**
   * Calculate exponential backoff for failed attempts
   */
  static calculateExponentialBackoff(attempts: number, baseDelay: number = 1000): number {
    return Math.min(baseDelay * Math.pow(2, attempts - 1), 3600000); // Cap at 1 hour
  }

  /**
   * Get current alert thresholds
   */
  getCurrentThresholds(): AlertThresholds {
    return this.thresholds;
  }

  /**
   * Update alert thresholds
   */
  updateThresholds(newThresholds: Partial<AlertThresholds>): void {
    this.thresholds = { ...this.thresholds, ...newThresholds };
  }

  /**
   * Add admin email for notifications
   */
  addAdminEmail(email: string): void {
    if (!this.adminEmails.includes(email)) {
      this.adminEmails.push(email);
    }
  }

  /**
   * Remove admin email
   */
  removeAdminEmail(email: string): void {
    this.adminEmails = this.adminEmails.filter(e => e !== email);
  }
}

/**
 * Global audit logger instance
 */
let globalAuditLogger: SecurityAuditLogger | null = null;

/**
 * Get or create global audit logger
 */
export function getAuditLogger(
  redisClient: Redis,
  thresholds?: Partial<AlertThresholds>,
  adminEmails?: string[]
): SecurityAuditLogger {
  if (!globalAuditLogger) {
    globalAuditLogger = new SecurityAuditLogger(redisClient, thresholds, adminEmails);
  }
  return globalAuditLogger;
}