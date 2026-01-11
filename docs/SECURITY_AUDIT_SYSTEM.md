# Security Audit Logging System

## Overview

The Security Audit Logging System provides comprehensive security event tracking with structured logging, IP reputation tracking, failed attempt thresholds, and admin notification capabilities.

## Key Features

### 1. Structured Logging with Winston
- JSON format logging with timestamps, event types, and metadata
- Multiple severity levels: `low`, `medium`, `high`, `critical`
- Persistent storage in both log files and database

### 2. IP Reputation Tracking
- Dynamic scoring system for IP addresses
- Failed attempt penalties and successful attempt bonuses
- Daily reputation decay to allow recovery
- Redis-backed for high performance

### 3. Failed Attempt Thresholds
- Configurable thresholds for failed login attempts
- Exponential backoff calculations
- Automatic alerting when thresholds are exceeded

### 4. Admin Notification System
- Email notifications for critical security events
- SMTP configuration support
- Multiple admin email recipients

### 5. Database Integration
- `SecurityAuditLog` model for comprehensive event tracking
- `SecurityAlert` model for security incidents
- Full integration with existing authentication flow

## Usage

### Basic Setup

```typescript
import { Redis } from 'ioredis';
import { getAuditLogger } from '@/lib/security/audit';

// Create Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Initialize audit logger
const auditLogger = getAuditLogger(
  redis,
  { failedLoginAttempts: 5 }, // Custom thresholds
  ['admin@example.com', 'security@example.com'] // Admin emails
);
```

### Logging Security Events

```typescript
// Log a successful login
await auditLogger.logEvent({
  eventType: 'LOGIN_ATTEMPT',
  severity: 'low',
  userId: 'user-123',
  email: 'user@example.com',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  metadata: {
    action: 'login_success',
    sessionId: 'session-456'
  },
  status: 'success'
});

// Log a failed login
await auditLogger.logEvent({
  eventType: 'LOGIN_ATTEMPT',
  severity: 'medium',
  email: 'unknown@example.com',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  metadata: {
    action: 'login_failed',
    error: 'invalid_credentials'
  },
  status: 'failure'
});
```

### IP Reputation Management

```typescript
// Get IP reputation
const reputation = await auditLogger.getIPReputation('192.168.1.1');
console.log(`IP Score: ${reputation?.score}`);

// Update thresholds dynamically
auditLogger.updateThresholds({
  failedLoginAttempts: 10,
  suspiciousActivityScore: 80
});
```

### Exponential Backoff

```typescript
// Calculate delay for rate limiting
const delayMs = SecurityAuditLogger.calculateExponentialBackoff(3); // 4000ms
```

## Configuration

### Environment Variables

```env
# SMTP Configuration (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=security@example.com
SMTP_PASS=password
SMTP_FROM=security@example.com

# Admin Emails (comma-separated)
ADMIN_EMAILS=admin@example.com,security@example.com
```

### Default Thresholds

```typescript
{
  failedLoginAttempts: 5,      // Trigger alert after 5 failed attempts
  suspiciousActivityScore: 75,  // Trigger alert when IP score drops below 25
  bruteForceAttempts: 10       // Trigger critical alert after 10 failed attempts
}
```

### Reputation Scoring

- **Initial Score**: 50 (neutral)
- **Failed Attempt Penalty**: -15 points
- **Successful Attempt Bonus**: +2 points
- **Daily Decay Rate**: 5% (score × 0.95)
- **Minimum Score**: 0
- **Maximum Score**: 100

## Integration with Authentication Flow

The system is automatically integrated with NextAuth.js authentication:

1. **Successful Logins**: Logged with `severity: 'low'` and `status: 'success'`
2. **Failed Logins**: Logged with `severity: 'medium'` and `status: 'failure'`
3. **IP Reputation**: Automatically updated on each login attempt
4. **Alerts**: Triggered when thresholds are exceeded

## Database Schema

### SecurityAuditLog

```prisma
model SecurityAuditLog {
  id          String   @id @default(cuid())
  timestamp   DateTime @default(now())
  eventType   String
  severity    String
  userId      String?
  email       String?
  ipAddress   String
  userAgent   String?
  metadata    String?  // JSON string
  status      String
}
```

### SecurityAlert

```prisma
model SecurityAlert {
  id          String   @id @default(cuid())
  alertType   String
  message     String
  severity    String
  context     String   // JSON string
  timestamp   DateTime @default(now())
  resolved    Boolean   @default(false)
  resolvedAt  DateTime?
  resolvedBy  String?
}
```

## Alert Types

| Alert Type | Severity | Description |
|------------|----------|-------------|
| `FAILED_LOGIN_THRESHOLD_EXCEEDED` | High | Multiple failed login attempts from same IP |
| `SUSPICIOUS_IP_ACTIVITY` | Medium | IP with low reputation score detected |
| `BRUTE_FORCE_DETECTED` | Critical | Potential brute force attack detected |
| `ACCOUNT_LOCKOUT` | High | User account locked due to too many failed attempts |
| `MFA_FAILURE` | Medium | Multiple MFA verification failures |

## Best Practices

1. **Monitor Alerts**: Regularly check security alerts and investigate suspicious activity
2. **Review Thresholds**: Adjust thresholds based on your application's traffic patterns
3. **Backup Logs**: Ensure audit logs are backed up and retained according to compliance requirements
4. **Test Notifications**: Verify email notifications are working properly
5. **Monitor Redis**: Ensure Redis has sufficient memory for IP reputation tracking

## Security Considerations

- Audit logs are stored in both files and database for redundancy
- IP reputation data is automatically expired after 30 days
- Email notifications use SMTP with optional TLS encryption
- All sensitive data is properly sanitized before logging
