import { NextRequest } from "next/server";
import { getSecurityConfig } from "@/config/security";
import { logger } from "@/lib/logging";

// IP to number conversion for CIDR matching
function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(part => parseInt(part, 10));
  if (parts.length !== 4 || parts.some(part => isNaN(part) || part < 0 || part > 255)) {
    throw new Error(`Invalid IP address: ${ip}`);
  }
  
  // Use unsigned 32-bit integer arithmetic
  // JavaScript uses 32-bit signed integers, so we need to handle this carefully
  // We use Math.pow to avoid overflow in intermediate calculations before unsigned conversion
  const result = ((parts[0] * 16777216) + (parts[1] * 65536) + (parts[2] * 256) + parts[3]);
  return result >>> 0; // Convert to unsigned 32-bit integer
}

// CIDR to range conversion
function cidrToRange(cidr: string): { start: number; end: number } {
  const [ip, prefix] = cidr.split("/");
  if (!ip || !prefix) {
    throw new Error(`Invalid CIDR notation: ${cidr}`);
  }
  
  const ipNum = ipToNumber(ip);
  const prefixNum = parseInt(prefix, 10);
  if (isNaN(prefixNum) || prefixNum < 0 || prefixNum > 32) {
    throw new Error(`Invalid CIDR prefix: ${prefix}`);
  }
  
  // Create mask using Math.pow to avoid bitwise shift overflow issues with signed ints
  const mask = prefixNum === 0 ? 0 : (0xffffffff - (Math.pow(2, 32 - prefixNum) - 1));

  // Apply mask using standard math to avoid signed bitwise issues
  // But bitwise AND is safer if we ensure operands are treated as unsigned?
  // Actually, bitwise AND in JS returns signed 32-bit int.
  // We need to convert back to unsigned with >>> 0.

  const start = (ipNum & mask) >>> 0;
  // Calculate end by adding the inverted mask size
  const size = Math.pow(2, 32 - prefixNum);
  const end = (start + size - 1) >>> 0;
  
  return { start, end };
}

// Check if IP is in CIDR range
function isIpInCidr(ip: string, cidr: string): boolean {
  try {
    const ipNum = ipToNumber(ip);
    const { start, end } = cidrToRange(cidr);
    return ipNum >= start && ipNum <= end;
  } catch (error) {
    logger.warn(`Error checking IP ${ip} against CIDR ${cidr}: ${error}`);
    return false;
  }
}

// Check if IP is allowed based on allowlist configuration
function isIpAllowed(ip: string, config: any): boolean {
  if (!config.ipAllowlist?.enabled) {
    return true; // Feature disabled
  }
  
  // Check exact IP matches
  if (config.ipAllowlist.allowedIPs.includes(ip)) {
    return true;
  }
  
  // Check CIDR ranges
  for (const cidr of config.ipAllowlist.allowedCIDRs) {
    if (isIpInCidr(ip, cidr)) {
      return true;
    }
  }
  
  return false;
}

// Simple IP geolocation lookup (mock implementation)
// In production, this would integrate with a geolocation service
async function getCountryFromIp(_ip: string): Promise<string | null> {
  // This is a mock implementation
  // In a real application, you would use a service like:
  // - MaxMind GeoIP2
  // - IP2Location
  // - IPAPI
  // - Cloudflare IP Geolocation
  
  // For now, we'll return null to indicate unknown
  // You would replace this with actual geolocation logic
  return null;
}

// Check if country is allowed based on geographic restrictions
async function isCountryAllowed(ip: string, config: any): Promise<boolean> {
  if (!config.geographicRestrictions?.enabled) {
    return true; // Feature disabled
  }
  
  const countryCode = await getCountryFromIp(ip);
  if (!countryCode) {
    // If we can't determine the country, we'll be permissive by default
    // In production, you might want to be more restrictive
    return true;
  }
  
  // Check if country is explicitly allowed
  if (config.geographicRestrictions.allowedCountries.length > 0) {
    return config.geographicRestrictions.allowedCountries.includes(countryCode);
  }
  
  // Check if country is explicitly blocked
  if (config.geographicRestrictions.blockedCountries.includes(countryCode)) {
    return false;
  }
  
  return true;
}

// Parse time string to minutes since midnight
function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(part => parseInt(part, 10));
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }
  return hours * 60 + minutes;
}

// Check if current time is within business hours
function isWithinBusinessHours(config: any): boolean {
  if (!config.timeBasedAccess?.enabled) {
    return true; // Feature disabled
  }
  
  const now = new Date();
  const timezone = config.timeBasedAccess.businessHours.timezone || "UTC";
  
  // Convert to target timezone
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      weekday: "short",
    };
    
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(now);
    
    const currentHour = parseInt(parts.find(p => p.type === "hour")?.value || "0", 10);
    const currentMinute = parseInt(parts.find(p => p.type === "minute")?.value || "0", 10);

    // Map weekday short name to 0-6 (Sunday-Saturday)
    const weekdayMap: Record<string, number> = {
      "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6
    };
    const weekdayStr = parts.find(p => p.type === "weekday")?.value || "Sun";
    const currentDay = weekdayMap[weekdayStr] ?? 0;
    
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    const startTimeMinutes = parseTimeToMinutes(config.timeBasedAccess.businessHours.startTime);
    const endTimeMinutes = parseTimeToMinutes(config.timeBasedAccess.businessHours.endTime);
    
    // Check if today is a business day
    const isBusinessDay = config.timeBasedAccess.businessHours.days.includes(currentDay);
    
    if (!isBusinessDay) {
      return false;
    }
    
    // Check if current time is within business hours
    if (startTimeMinutes <= endTimeMinutes) {
      // Same day business hours (e.g., 9:00-17:00)
      return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
    } else {
      // Overnight business hours (e.g., 22:00-06:00)
      return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
    }
  } catch (error) {
    logger.error(`Error checking business hours: ${error}`);
    return true; // Fail open if we can't determine time
  }
}

// Check if current time is within any maintenance window
function isWithinMaintenanceWindow(config: any): boolean {
  if (!config.timeBasedAccess?.enabled || !config.timeBasedAccess.maintenanceWindows) {
    return false; // Feature disabled or no maintenance windows
  }
  
  const now = new Date();
  
  for (const window of config.timeBasedAccess.maintenanceWindows) {
    const timezone = window.timezone || "UTC";
    
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        weekday: "short",
      };
      
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);
      
      const currentHour = parseInt(parts.find(p => p.type === "hour")?.value || "0", 10);
      const currentMinute = parseInt(parts.find(p => p.type === "minute")?.value || "0", 10);

      // Map weekday short name to 0-6 (Sunday-Saturday)
      const weekdayMap: Record<string, number> = {
        "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6
      };
      const weekdayStr = parts.find(p => p.type === "weekday")?.value || "Sun";
      const currentDay = weekdayMap[weekdayStr] ?? 0;
      
      const currentTimeMinutes = currentHour * 60 + currentMinute;
      const startTimeMinutes = parseTimeToMinutes(window.startTime);
      const endTimeMinutes = parseTimeToMinutes(window.endTime);
      
      // Check if today is in the maintenance window days
      const isMaintenanceDay = window.days.includes(currentDay);
      
      if (!isMaintenanceDay) {
        continue;
      }
      
      // Check if current time is within maintenance window
      if (startTimeMinutes <= endTimeMinutes) {
        // Same day maintenance window
        if (currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes) {
          return true;
        }
      } else {
        // Overnight maintenance window
        if (currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes) {
          return true;
        }
      }
    } catch (error) {
      logger.error(`Error checking maintenance window: ${error}`);
      continue; // Skip this window if there's an error
    }
  }
  
  return false;
}

// Check if access is allowed based on time restrictions
async function isTimeAccessAllowed(config: any): Promise<boolean> {
  // Check maintenance windows first (highest priority)
  if (isWithinMaintenanceWindow(config)) {
    return false;
  }
  
  // Check business hours
  return isWithinBusinessHours(config);
}

// Main admin protection middleware function
async function checkAdminAccess(request: NextRequest): Promise<{ allowed: boolean; reason?: string }> {
  const config = getSecurityConfig();
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  
  logger.info(`[AdminProtection] Checking access for IP: ${ip}`);
  
  // Check IP allowlist
  if (!isIpAllowed(ip, config)) {
    logger.warn(`[AdminProtection] IP ${ip} is not in allowlist`);
    return { allowed: false, reason: "IP_NOT_ALLOWED" };
  }
  
  // Check geographic restrictions
  const countryAllowed = await isCountryAllowed(ip, config);
  if (!countryAllowed) {
    logger.warn(`[AdminProtection] IP ${ip} is from a restricted country`);
    return { allowed: false, reason: "COUNTRY_NOT_ALLOWED" };
  }
  
  // Check time-based access
  const timeAccessAllowed = await isTimeAccessAllowed(config);
  if (!timeAccessAllowed) {
    logger.warn(`[AdminProtection] Access denied due to time restrictions for IP ${ip}`);
    return { allowed: false, reason: "TIME_ACCESS_DENIED" };
  }
  
  logger.info(`[AdminProtection] Access granted for IP: ${ip}`);
  return { allowed: true };
}

export {
  checkAdminAccess,
  isIpAllowed,
  isCountryAllowed,
  isTimeAccessAllowed,
  ipToNumber,
  cidrToRange,
  isIpInCidr,
  getCountryFromIp,
  parseTimeToMinutes,
  isWithinBusinessHours,
  isWithinMaintenanceWindow
};