import { z } from "zod";

// Define explicit TypeScript interfaces to avoid recursive type inference issues
interface IpAllowlistConfig {
  enabled: boolean;
  allowedIPs: string[];
  allowedCIDRs: string[];
}

interface GeographicRestrictionsConfig {
  enabled: boolean;
  allowedCountries: string[];
  blockedCountries: string[];
}

interface BusinessHoursConfig {
  startTime: string;
  endTime: string;
  timezone: string;
  days: number[];
}

interface MaintenanceWindow {
  startTime: string;
  endTime: string;
  timezone: string;
  days: number[];
}

interface TimeBasedAccessConfig {
  enabled: boolean;
  businessHours: BusinessHoursConfig;
  maintenanceWindows: MaintenanceWindow[];
}

interface AdminRoutesConfig {
  protectedPaths: string[];
  loginPath: string;
  errorPath: string;
}

interface SecurityConfig {
  ipAllowlist: IpAllowlistConfig;
  geographicRestrictions: GeographicRestrictionsConfig;
  timeBasedAccess: TimeBasedAccessConfig;
  adminRoutes: AdminRoutesConfig;
}

// Simple validation schemas without complex type inference
const ipAllowlistSchema = z.object({
  enabled: z.boolean(),
  allowedIPs: z.array(z.string()),
  allowedCIDRs: z.array(z.string()),
});

const geographicRestrictionsSchema = z.object({
  enabled: z.boolean(),
  allowedCountries: z.array(z.string()),
  blockedCountries: z.array(z.string()),
});

const businessHoursSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
  days: z.array(z.number()),
});

const maintenanceWindowSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
  days: z.array(z.number()),
});

const timeBasedAccessSchema = z.object({
  enabled: z.boolean(),
  businessHours: businessHoursSchema,
  maintenanceWindows: z.array(maintenanceWindowSchema),
});

const adminRoutesSchema = z.object({
  protectedPaths: z.array(z.string()),
  loginPath: z.string(),
  errorPath: z.string(),
});

// Minimal Zod schema that just validates structure
const SecurityConfigSchema = z.object({
  ipAllowlist: ipAllowlistSchema,
  geographicRestrictions: geographicRestrictionsSchema,
  timeBasedAccess: timeBasedAccessSchema,
  adminRoutes: adminRoutesSchema,
});

// Default security configuration
const defaultSecurityConfig: SecurityConfig = {
  ipAllowlist: {
    enabled: false,
    allowedIPs: [],
    allowedCIDRs: [],
  },
  
  geographicRestrictions: {
    enabled: false,
    allowedCountries: [],
    blockedCountries: [],
  },
  
  timeBasedAccess: {
    enabled: false,
    businessHours: {
      startTime: "09:00",
      endTime: "17:00",
      timezone: "UTC",
      days: [1, 2, 3, 4, 5],
    },
    maintenanceWindows: [],
  },
  
  adminRoutes: {
    protectedPaths: ["/admin"],
    loginPath: "/admin/login",
    errorPath: "/admin/error",
  },
};

// Load configuration from environment variables
function loadSecurityConfigFromEnv(): SecurityConfig {
  try {
    const config: SecurityConfig = {
      ipAllowlist: {
        enabled: process.env.ADMIN_IP_ALLOWLIST_ENABLED === "true",
        allowedIPs: process.env.ADMIN_ALLOWED_IPS?.split(",").map(ip => ip.trim()) || [],
        allowedCIDRs: process.env.ADMIN_ALLOWED_CIDRS?.split(",").map(cidr => cidr.trim()) || [],
      },
      
      geographicRestrictions: {
        enabled: process.env.ADMIN_GEO_RESTRICTIONS_ENABLED === "true",
        allowedCountries: process.env.ADMIN_ALLOWED_COUNTRIES?.split(",").map(country => country.trim().toUpperCase()) || [],
        blockedCountries: process.env.ADMIN_BLOCKED_COUNTRIES?.split(",").map(country => country.trim().toUpperCase()) || [],
      },
      
      timeBasedAccess: {
        enabled: process.env.ADMIN_TIME_BASED_ACCESS_ENABLED === "true",
        businessHours: {
          startTime: process.env.ADMIN_BUSINESS_HOURS_START || "09:00",
          endTime: process.env.ADMIN_BUSINESS_HOURS_END || "17:00",
          timezone: process.env.ADMIN_TIMEZONE || "UTC",
          days: process.env.ADMIN_BUSINESS_DAYS?.split(",").map(day => parseInt(day.trim())) || [1, 2, 3, 4, 5],
        },
        maintenanceWindows: [],
      },
      
      adminRoutes: {
        protectedPaths: ["/admin"],
        loginPath: "/admin/login",
        errorPath: "/admin/error",
      },
    };
    
    // Parse maintenance windows if configured
    if (process.env.ADMIN_MAINTENANCE_WINDOWS) {
      try {
        const windows = JSON.parse(process.env.ADMIN_MAINTENANCE_WINDOWS);
        if (Array.isArray(windows)) {
          config.timeBasedAccess.maintenanceWindows = windows;
        }
      } catch (error) {
        console.warn("Failed to parse maintenance windows from environment:", error);
      }
    }
    
    // Validate the configuration
    const result = SecurityConfigSchema.safeParse(config);
    if (!result.success) {
      console.error("Invalid security configuration from environment:", result.error);
      return defaultSecurityConfig;
    }
    
    return config;
  } catch (error) {
    console.error("Invalid security configuration from environment, using defaults:", error);
    return defaultSecurityConfig;
  }
}

// Get the current security configuration
function getSecurityConfig(): SecurityConfig {
  if (process.env.NODE_ENV === "test") {
    return defaultSecurityConfig;
  }
  
  return loadSecurityConfigFromEnv();
}

export { getSecurityConfig, SecurityConfigSchema };
export type { SecurityConfig };