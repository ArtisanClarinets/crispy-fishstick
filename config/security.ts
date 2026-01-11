import { z } from "zod";

// Define the schema for security configuration
const SecurityConfigSchema = z.object({
  // IP Allowlist configuration
  ipAllowlist: z.object({
    enabled: z.boolean().default(false),
    allowedIPs: z.array(z.string()).default([]),
    allowedCIDRs: z.array(z.string()).default([]),
  }),
  
  // Geographic restrictions configuration
  geographicRestrictions: z.object({
    enabled: z.boolean().default(false),
    allowedCountries: z.array(z.string()).default([]),
    blockedCountries: z.array(z.string()).default([]),
  }),
  
  // Time-based access controls
  timeBasedAccess: z.object({
    enabled: z.boolean().default(false),
    businessHours: z.object({
      startTime: z.string().default("09:00"),
      endTime: z.string().default("17:00"),
      timezone: z.string().default("UTC"),
      days: z.array(z.number().min(0).max(6)).default([1, 2, 3, 4, 5]), // Monday-Friday
    }),
    maintenanceWindows: z.array(z.object({
      startTime: z.string(),
      endTime: z.string(),
      timezone: z.string(),
      days: z.array(z.number().min(0).max(6)),
    })).default([]),
  }),
  
  // Admin route specific settings
  adminRoutes: z.object({
    protectedPaths: z.array(z.string()).default(["/admin"]),
    loginPath: z.string().default("/admin/login"),
    errorPath: z.string().default("/admin/error"),
  }),
});

type SecurityConfig = z.infer<typeof SecurityConfigSchema>;

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
      days: [1, 2, 3, 4, 5], // Monday-Friday
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
    const config: Partial<SecurityConfig> = {
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
          config.timeBasedAccess!.maintenanceWindows = windows;
        }
      } catch (error) {
        console.warn("Failed to parse maintenance windows from environment:", error);
      }
    }
    
    return SecurityConfigSchema.parse(config);
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