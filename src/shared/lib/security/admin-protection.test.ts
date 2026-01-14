import { describe, it, expect, vi } from "vitest";
import {
  isIpAllowed,
  isIpInCidr,
  ipToNumber,
  cidrToRange,
  parseTimeToMinutes,
  isWithinBusinessHours,
  isWithinMaintenanceWindow,
} from "./admin-protection";

// Mock the security config
const mockConfig = {
  ipAllowlist: {
    enabled: true,
    allowedIPs: ["192.168.1.100"],
    allowedCIDRs: ["192.168.2.0/24", "10.0.0.0/8"],
  },
  geographicRestrictions: {
    enabled: false,
    allowedCountries: [],
    blockedCountries: [],
  },
  timeBasedAccess: {
    enabled: true,
    businessHours: {
      startTime: "09:00",
      endTime: "17:00",
      timezone: "UTC",
      days: [1, 2, 3, 4, 5], // Monday-Friday
    },
    maintenanceWindows: [
      {
        startTime: "02:00",
        endTime: "04:00",
        timezone: "UTC",
        days: [0, 1, 2, 3, 4, 5, 6], // Every day
      },
    ],
  },
};

describe("Admin Protection Utilities", () => {
  describe("IP Utilities", () => {
    it("should convert IP to number correctly", () => {
      expect(ipToNumber("192.168.1.1")).toBe(3232235777);
      expect(ipToNumber("10.0.0.1")).toBe(167772161);
      expect(ipToNumber("0.0.0.0")).toBe(0);
      expect(ipToNumber("255.255.255.255")).toBe(4294967295);
    });

    it("should throw error for invalid IP", () => {
      expect(() => ipToNumber("invalid")).toThrow();
      expect(() => ipToNumber("256.1.1.1")).toThrow();
      expect(() => ipToNumber("1.1.1")).toThrow();
    });

    it("should convert CIDR to range correctly", () => {
      const range1 = cidrToRange("192.168.1.0/24");
      expect(range1.start).toBe(3232235776);
      expect(range1.end).toBe(3232236031);

      const range2 = cidrToRange("10.0.0.0/8");
      expect(range2.start).toBe(167772160);
      expect(range2.end).toBe(184549375);

      const range3 = cidrToRange("192.168.1.1/32");
      expect(range3.start).toBe(3232235777);
      expect(range3.end).toBe(3232235777);
    });

    it("should check if IP is in CIDR range correctly", () => {
      expect(isIpInCidr("192.168.1.10", "192.168.1.0/24")).toBe(true);
      expect(isIpInCidr("192.168.2.10", "192.168.1.0/24")).toBe(false);
      expect(isIpInCidr("10.0.0.5", "10.0.0.0/8")).toBe(true);
      expect(isIpInCidr("11.0.0.5", "10.0.0.0/8")).toBe(false);
    });

    it("should check if IP is allowed", () => {
      // Test with exact IP match
      expect(isIpAllowed("192.168.1.100", mockConfig)).toBe(true);
      expect(isIpAllowed("192.168.1.101", mockConfig)).toBe(false);

      // Test with CIDR match
      expect(isIpAllowed("192.168.2.50", mockConfig)).toBe(true);
      expect(isIpAllowed("10.5.5.5", mockConfig)).toBe(true);
      expect(isIpAllowed("172.16.0.1", mockConfig)).toBe(false);
    });

    it("should allow all IPs when feature is disabled", () => {
      const disabledConfig = { ...mockConfig, ipAllowlist: { ...mockConfig.ipAllowlist, enabled: false } };
      expect(isIpAllowed("172.16.0.1", disabledConfig)).toBe(true);
    });
  });

  describe("Time Utilities", () => {
    it("should parse time to minutes correctly", () => {
      expect(parseTimeToMinutes("09:00")).toBe(540);
      expect(parseTimeToMinutes("17:30")).toBe(1050);
      expect(parseTimeToMinutes("00:00")).toBe(0);
      expect(parseTimeToMinutes("23:59")).toBe(1439);
    });

    it("should throw error for invalid time format", () => {
      expect(() => parseTimeToMinutes("24:00")).toThrow();
      expect(() => parseTimeToMinutes("12:60")).toThrow();
      expect(() => parseTimeToMinutes("invalid")).toThrow();
    });

    it("should check business hours correctly", () => {
      // Mock Date to test different times
      const originalDate = global.Date;

      // Test within business hours (Monday 10:00 UTC)
      const mockDate1 = new originalDate("2023-01-02T10:00:00Z"); // Monday
      vi.useFakeTimers().setSystemTime(mockDate1);
      expect(isWithinBusinessHours(mockConfig)).toBe(true);

      // Test outside business hours (Monday 08:00 UTC)
      const mockDate2 = new originalDate("2023-01-02T08:00:00Z");
      vi.useFakeTimers().setSystemTime(mockDate2);
      expect(isWithinBusinessHours(mockConfig)).toBe(false);

      // Test outside business hours (Monday 18:00 UTC)
      const mockDate3 = new originalDate("2023-01-02T18:00:00Z");
      vi.useFakeTimers().setSystemTime(mockDate3);
      expect(isWithinBusinessHours(mockConfig)).toBe(false);

      // Test on weekend (Saturday)
      const mockDate4 = new originalDate("2023-01-07T10:00:00Z"); // Saturday
      vi.useFakeTimers().setSystemTime(mockDate4);
      expect(isWithinBusinessHours(mockConfig)).toBe(false);

      vi.useRealTimers();
      global.Date = originalDate;
    });

    it("should check maintenance windows correctly", () => {
      const originalDate = global.Date;

      // Test within maintenance window (03:00 UTC)
      const mockDate1 = new originalDate("2023-01-02T03:00:00Z");
      vi.useFakeTimers().setSystemTime(mockDate1);
      expect(isWithinMaintenanceWindow(mockConfig)).toBe(true);

      // Test outside maintenance window (01:00 UTC)
      const mockDate2 = new originalDate("2023-01-02T01:00:00Z");
      vi.useFakeTimers().setSystemTime(mockDate2);
      expect(isWithinMaintenanceWindow(mockConfig)).toBe(false);

      // Test outside maintenance window (05:00 UTC)
      const mockDate3 = new originalDate("2023-01-02T05:00:00Z");
      vi.useFakeTimers().setSystemTime(mockDate3);
      expect(isWithinMaintenanceWindow(mockConfig)).toBe(false);

      vi.useRealTimers();
      global.Date = originalDate;
    });
  });

  describe("Integration Tests", () => {
    it("should handle edge cases gracefully", () => {
      // Test with empty config
      const emptyConfig = {
        ipAllowlist: { enabled: false, allowedIPs: [], allowedCIDRs: [] },
        geographicRestrictions: { enabled: false, allowedCountries: [], blockedCountries: [] },
        timeBasedAccess: { enabled: false, businessHours: { startTime: "09:00", endTime: "17:00", timezone: "UTC", days: [] }, maintenanceWindows: [] },
      };

      expect(isIpAllowed("1.2.3.4", emptyConfig)).toBe(true);
    });
  });
});