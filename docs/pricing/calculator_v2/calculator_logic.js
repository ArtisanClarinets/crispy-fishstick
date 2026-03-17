/**
 * Vantus Systems Package Pricing Calculator Logic
 * Version: 2.0
 * Last updated: 2026-03-07
 *
 * Generates range-based estimates for Vantus build services
 */

// ============================================
// PACKAGE TIER DEFINITIONS
// ============================================

const PACKAGE_TIERS = {
  website_rebuild: {
    id: "website_rebuild",
    name: "Website Rebuild",
    description: "Modern, responsive website with core functionality",
    basePrice: 15000,
    typicalRange: [15000, 55000],
    features: [
      "Responsive design",
      "SEO optimization",
      "Contact forms",
      "Basic analytics",
      "Mobile-first approach",
    ],
  },
  website_plus_cms: {
    id: "website_plus_cms",
    name: "Website + CMS (Recommended)",
    description: "Full website with content management system",
    basePrice: 32000,
    typicalRange: [32000, 125000],
    features: [
      "Everything in Website Rebuild",
      "Content management system",
      "User roles and permissions",
      "Blog/news functionality",
      "Media library",
      "Form builder",
    ],
  },
  website_plus_portal: {
    id: "website_plus_portal",
    name: "Website + Business Portal",
    description: "Website with client portal and business tools",
    basePrice: 90000,
    typicalRange: [90000, 400000],
    features: [
      "Everything in Website + CMS",
      "Client portal/dashboard",
      "Document management",
      "Client communication tools",
      "Reporting dashboard",
      "API integrations",
    ],
  },
  enterprise_systems: {
    id: "enterprise_systems",
    name: "Enterprise Systems",
    description: "Custom enterprise-grade solutions",
    basePrice: 250000,
    typicalRange: [250000, 1200000],
    features: [
      "Custom architecture design",
      "Multi-system integration",
      "Advanced security & compliance",
      "Scalable infrastructure",
      "Dedicated support",
      "Custom reporting & analytics",
    ],
  },
};

// ============================================
// ADD-ON MODULE DEFINITIONS
// ============================================

const ADD_ON_MODULES = {
  discovery_blueprint: {
    id: "discovery_blueprint",
    name: "Discovery + Solution Blueprint",
    description:
      "Comprehensive discovery phase with detailed solution architecture",
    priceRange: [5000, 20000],
    recommended: true,
  },
  data_migration: {
    id: "data_migration",
    name: "Data and Content Migration",
    description: "Migration of existing content, data, and assets",
    priceRange: [4000, 30000],
    recommended: false,
  },
  integration: {
    id: "integration",
    name: "Integration (per system)",
    description: "Third-party system integration (CRM, ERP, etc.)",
    priceRange: [8000, 35000],
    perUnit: true,
    recommended: false,
  },
  sso_rbac: {
    id: "sso_rbac",
    name: "SSO + RBAC Hardening",
    description: "Single sign-on and role-based access control implementation",
    priceRange: [12000, 50000],
    recommended: false,
  },
  analytics: {
    id: "analytics",
    name: "Analytics and Dashboarding",
    description: "Custom analytics dashboards and reporting tools",
    priceRange: [7000, 30000],
    recommended: false,
  },
  localization: {
    id: "localization",
    name: "Localization Framework",
    description: "Multi-language support and localization infrastructure",
    priceRange: [8000, 40000],
    recommended: false,
  },
};

// ============================================
// COMPLEXITY MULTIPLIERS
// ============================================

const COMPLEXITY_MULTIPLIERS = {
  contentVolume: {
    1: { label: "1-10 pages", multiplier: 1.0 },
    2: { label: "10-50 pages", multiplier: 1.15 },
    3: { label: "50-100 pages", multiplier: 1.35 },
    4: { label: "100-200 pages", multiplier: 1.55 },
    5: { label: "200+ pages", multiplier: 1.75 },
  },
  integrationComplexity: {
    0: { label: "None", multiplier: 1.0 },
    1: { label: "1 system", multiplier: 1.1 },
    2: { label: "2 systems", multiplier: 1.2 },
    3: { label: "3 systems", multiplier: 1.35 },
    4: { label: "4 systems", multiplier: 1.5 },
    5: { label: "5+ systems", multiplier: 1.7 },
  },
  customFunctionality: {
    1: { label: "Minimal", multiplier: 1.0 },
    2: { label: "Light", multiplier: 1.1 },
    3: { label: "Moderate", multiplier: 1.25 },
    4: { label: "Heavy", multiplier: 1.45 },
    5: { label: "Extensive", multiplier: 1.7 },
  },
  migrationComplexity: {
    1: { label: "None", multiplier: 1.0 },
    2: { label: "Simple", multiplier: 1.1 },
    3: { label: "Moderate", multiplier: 1.25 },
    4: { label: "Complex", multiplier: 1.4 },
    5: { label: "Very Complex", multiplier: 1.6 },
  },
  complianceRequirements: {
    none: { label: "None", multiplier: 1.0 },
    ada: { label: "ADA/WCAG", multiplier: 1.1 },
    hipaa: { label: "HIPAA", multiplier: 1.25 },
    pci: { label: "PCI-DSS", multiplier: 1.2 },
    soc2: { label: "SOC2", multiplier: 1.15 },
    gdpr: { label: "GDPR", multiplier: 1.1 },
  },
  timelinePressure: {
    1: { label: "Standard (8-12 weeks)", multiplier: 1.0 },
    2: { label: "Accelerated (6-8 weeks)", multiplier: 1.15 },
    3: { label: "Rush (4-6 weeks)", multiplier: 1.3 },
    4: { label: "Emergency (2-4 weeks)", multiplier: 1.5 },
    5: { label: "Critical (< 2 weeks)", multiplier: 1.75 },
  },
};

// ============================================
// CALCULATOR CLASS
// ============================================

class VantusPricingCalculator {
  constructor() {
    this.selectedPackage = null;
    this.complexityFactors = {
      contentVolume: 1,
      integrationComplexity: 0,
      customFunctionality: 1,
      migrationComplexity: 1,
      complianceRequirements: [],
      timelinePressure: 1,
    };
    this.selectedAddOns = [];
    this.integrationCount = 0;
  }

  /**
   * Set the selected package tier
   */
  setPackage(packageId) {
    if (!PACKAGE_TIERS[packageId]) {
      throw new Error(`Invalid package ID: ${packageId}`);
    }
    this.selectedPackage = packageId;
    return this;
  }

  /**
   * Set complexity factor
   */
  setComplexityFactor(factor, value) {
    if (!COMPLEXITY_MULTIPLIERS[factor]) {
      throw new Error(`Invalid complexity factor: ${factor}`);
    }
    this.complexityFactors[factor] = value;
    return this;
  }

  /**
   * Set compliance requirements (array)
   */
  setComplianceRequirements(requirements) {
    this.complexityFactors.complianceRequirements = requirements;
    return this;
  }

  /**
   * Toggle add-on module
   */
  toggleAddOn(addOnId, enabled, count = 1) {
    if (!ADD_ON_MODULES[addOnId]) {
      throw new Error(`Invalid add-on ID: ${addOnId}`);
    }

    if (enabled) {
      const existing = this.selectedAddOns.find((a) => a.id === addOnId);
      if (!existing) {
        this.selectedAddOns.push({ id: addOnId, count });
      } else {
        existing.count = count;
      }
    } else {
      this.selectedAddOns = this.selectedAddOns.filter((a) => a.id !== addOnId);
    }
    return this;
  }

  /**
   * Calculate complexity score (0-100)
   */
  calculateComplexityScore() {
    let score = 0;
    const weights = {
      contentVolume: 15,
      integrationComplexity: 20,
      customFunctionality: 25,
      migrationComplexity: 15,
      complianceRequirements: 15,
      timelinePressure: 10,
    };

    // Content volume
    score +=
      (this.complexityFactors.contentVolume - 1) * (weights.contentVolume / 4);

    // Integration complexity
    score +=
      this.complexityFactors.integrationComplexity *
      (weights.integrationComplexity / 5);

    // Custom functionality
    score +=
      (this.complexityFactors.customFunctionality - 1) *
      (weights.customFunctionality / 4);

    // Migration complexity
    score +=
      (this.complexityFactors.migrationComplexity - 1) *
      (weights.migrationComplexity / 4);

    // Compliance requirements
    const complianceCount =
      this.complexityFactors.complianceRequirements.length;
    score += complianceCount * (weights.complianceRequirements / 5);

    // Timeline pressure
    score +=
      (this.complexityFactors.timelinePressure - 1) *
      (weights.timelinePressure / 4);

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  /**
   * Calculate overall complexity multiplier
   */
  calculateOverallMultiplier() {
    let multiplier = 1.0;

    // Content volume
    const contentMult =
      COMPLEXITY_MULTIPLIERS.contentVolume[
        this.complexityFactors.contentVolume
      ];
    if (contentMult) multiplier *= contentMult.multiplier;

    // Integration complexity
    const integrationMult =
      COMPLEXITY_MULTIPLIERS.integrationComplexity[
        this.complexityFactors.integrationComplexity
      ];
    if (integrationMult) multiplier *= integrationMult.multiplier;

    // Custom functionality
    const customMult =
      COMPLEXITY_MULTIPLIERS.customFunctionality[
        this.complexityFactors.customFunctionality
      ];
    if (customMult) multiplier *= customMult.multiplier;

    // Migration complexity
    const migrationMult =
      COMPLEXITY_MULTIPLIERS.migrationComplexity[
        this.complexityFactors.migrationComplexity
      ];
    if (migrationMult) multiplier *= migrationMult.multiplier;

    // Compliance requirements
    this.complexityFactors.complianceRequirements.forEach((req) => {
      const complianceMult = COMPLEXITY_MULTIPLIERS.complianceRequirements[req];
      if (complianceMult) multiplier *= complianceMult.multiplier;
    });

    // Timeline pressure
    const timelineMult =
      COMPLEXITY_MULTIPLIERS.timelinePressure[
        this.complexityFactors.timelinePressure
      ];
    if (timelineMult) multiplier *= timelineMult.multiplier;

    return multiplier;
  }

  /**
   * Calculate package estimate with ranges
   */
  calculatePackageEstimate() {
    if (!this.selectedPackage) {
      throw new Error("No package selected");
    }

    const pkg = PACKAGE_TIERS[this.selectedPackage];
    const basePrice = pkg.basePrice;
    const multiplier = this.calculateOverallMultiplier();

    // Calculate low and high estimates
    // Low estimate: base price with minimal complexity adjustments
    const lowEstimate = Math.round(
      basePrice * Math.max(1.0, multiplier * 0.85),
    );

    // High estimate: base price with full complexity adjustments
    const highEstimate = Math.round(basePrice * multiplier * 1.15);

    return {
      packageId: this.selectedPackage,
      packageName: pkg.name,
      basePrice,
      multiplier: Math.round(multiplier * 100) / 100,
      lowEstimate,
      highEstimate,
      typicalRange: pkg.typicalRange,
    };
  }

  /**
   * Calculate add-ons estimate
   */
  calculateAddOnsEstimate() {
    const addOns = this.selectedAddOns.map((addOn) => {
      const module = ADD_ON_MODULES[addOn.id];
      const complexityScore = this.calculateComplexityScore();

      // Adjust add-on price based on overall complexity
      const complexityFactor = 1 + (complexityScore / 100) * 0.5;

      const lowPrice = Math.round(
        module.priceRange[0] * complexityFactor * addOn.count,
      );
      const highPrice = Math.round(
        module.priceRange[1] * complexityFactor * addOn.count,
      );

      return {
        id: addOn.id,
        name: module.name,
        count: addOn.count,
        lowPrice,
        highPrice,
        priceRange: module.priceRange,
      };
    });

    const totalLow = addOns.reduce((sum, a) => sum + a.lowPrice, 0);
    const totalHigh = addOns.reduce((sum, a) => sum + a.highPrice, 0);

    return {
      addOns,
      totalLow,
      totalHigh,
    };
  }

  /**
   * Generate complete estimate
   */
  generateEstimate() {
    const packageEstimate = this.calculatePackageEstimate();
    const addOnsEstimate = this.calculateAddOnsEstimate();
    const complexityScore = this.calculateComplexityScore();

    const grandTotalLow = packageEstimate.lowEstimate + addOnsEstimate.totalLow;
    const grandTotalHigh =
      packageEstimate.highEstimate + addOnsEstimate.totalHigh;

    return {
      timestamp: new Date().toISOString(),
      package: packageEstimate,
      addOns: addOnsEstimate,
      complexity: {
        score: complexityScore,
        level: this.getComplexityLevel(complexityScore),
        multiplier: packageEstimate.multiplier,
      },
      totals: {
        packageLow: packageEstimate.lowEstimate,
        packageHigh: packageEstimate.highEstimate,
        addOnsLow: addOnsEstimate.totalLow,
        addOnsHigh: addOnsEstimate.totalHigh,
        grandTotalLow,
        grandTotalHigh,
      },
      disclaimers: this.generateDisclaimers(),
    };
  }

  /**
   * Get complexity level label
   */
  getComplexityLevel(score) {
    if (score < 20) return "Low";
    if (score < 40) return "Moderate";
    if (score < 60) return "High";
    if (score < 80) return "Very High";
    return "Extreme";
  }

  /**
   * Generate appropriate disclaimers
   */
  generateDisclaimers() {
    const disclaimers = [
      "This estimate is preliminary and subject to change.",
      "Final pricing requires a detailed discovery session and written scope.",
      "Prices do not include ongoing maintenance or support (Vantus Care).",
      "Timeline estimates assume standard business hours and client responsiveness.",
    ];

    if (this.complexityFactors.timelinePressure >= 4) {
      disclaimers.push(
        "Rush timeline may impact quality and requires additional resources.",
      );
    }

    if (this.complexityFactors.complianceRequirements.length > 2) {
      disclaimers.push(
        "Multiple compliance requirements may extend timeline and cost.",
      );
    }

    return disclaimers;
  }
}

// ============================================
// EXPORTS
// ============================================

// For Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VantusPricingCalculator,
    PACKAGE_TIERS,
    ADD_ON_MODULES,
    COMPLEXITY_MULTIPLIERS,
  };
}

// For browser
if (typeof window !== "undefined") {
  window.VantusPricingCalculator = VantusPricingCalculator;
  window.PACKAGE_TIERS = PACKAGE_TIERS;
  window.ADD_ON_MODULES = ADD_ON_MODULES;
  window.COMPLEXITY_MULTIPLIERS = COMPLEXITY_MULTIPLIERS;
}
