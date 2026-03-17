/**
 * Vantus Pricing Calculator
 * Production-Ready JavaScript Module
 * 
 * @version 2.0
 * @date 2026-02-20
 * @description Real-time pricing calculator for managed services and cloud infrastructure
 */

(function(global) {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const CONFIG = {
        currency: 'USD',
        locale: 'en-US',
        decimalPlaces: 2,
        taxRate: 0, // Set to local tax rate if applicable
        annualDiscountPercent: 10
    };

    // ============================================
    // PRICING DATA
    // ============================================

    const MANAGED_SERVICES_TIERS = {
        foundation: {
            name: 'Foundation',
            monthlyPrice: 99,
            annualPrice: 89,
            includedServers: 0,
            servers: {
                basic: { price: 129, name: 'Basic Server' },
                application: { price: 199, name: 'Application Server' },
                database: { price: 279, name: 'Database Server' },
                compliance: { price: 349, name: 'Compliance Server' }
            },
            features: [
                'Unlimited remote help desk (8am-8pm)',
                '4-hour response SLA',
                'Proactive monitoring & alerting',
                'Automated patching',
                'EDR antivirus',
                'Email security gateway',
                'DNS filtering',
                'Backup & disaster recovery (1TB/user)',
                'Quarterly security training',
                'No minimum users'
            ]
        },
        professional: {
            name: 'Professional',
            monthlyPrice: 149,
            annualPrice: 134,
            includedServers: 1,
            servers: {
                basic: { price: 0, name: 'Basic Server (Included)' },
                application: { price: 99, name: 'Application Server' },
                database: { price: 149, name: 'Database Server' },
                compliance: { price: 199, name: 'Compliance Server' }
            },
            features: [
                'Everything in Foundation, plus:',
                'Unlimited on-site support',
                'Extended hours (7am-10pm)',
                '1-hour response SLA',
                'VoIP phone service (unlimited)',
                'Mobile device management',
                'Dark web monitoring',
                'Monthly phishing simulations',
                'Hardware lifecycle planning',
                'Quarterly vCIO consultation'
            ],
            popular: true
        },
        enterprise: {
            name: 'Enterprise',
            monthlyPrice: 199,
            annualPrice: 179,
            includedServers: 2,
            servers: {
                basic: { price: 0, name: 'Basic Server (Included)' },
                application: { price: 0, name: 'Application Server (Included)' },
                database: { price: 99, name: 'Database Server' },
                compliance: { price: 149, name: 'Compliance Server' }
            },
            features: [
                'Everything in Professional, plus:',
                '24/7/365 coverage',
                '15-minute response SLA',
                'Managed SIEM & XDR',
                '24/7 SOC',
                'Compliance program management',
                'Annual penetration testing',
                'Dedicated vCIO',
                'Weekly executive dashboards',
                'Compliance guarantee'
            ]
        }
    };

    const CLOUD_PROVIDERS = {
        aws: {
            name: 'Amazon Web Services',
            shortName: 'AWS',
            logo: '/assets/aws-logo.svg',
            instances: {
                small: { name: 't3.medium', vcpu: 2, ram: '4GB', hourly: 0.0416, monthly: 62, annual: 374 },
                medium: { name: 't3.large', vcpu: 2, ram: '8GB', hourly: 0.0832, monthly: 125, annual: 750 },
                large: { name: 'm5.large', vcpu: 2, ram: '8GB', hourly: 0.096, monthly: 144, annual: 864 },
                xlarge: { name: 'm5.xlarge', vcpu: 4, ram: '16GB', hourly: 0.192, monthly: 288, annual: 1728 }
            },
            storage: {
                standard: { price: 0.023, name: 'S3 Standard' },
                ia: { price: 0.0125, name: 'S3 Infrequent Access' },
                glacier: { price: 0.004, name: 'S3 Glacier' }
            }
        },
        azure: {
            name: 'Microsoft Azure',
            shortName: 'Azure',
            logo: '/assets/azure-logo.svg',
            instances: {
                small: { name: 'B2s', vcpu: 2, ram: '4GB', hourly: 0.0416, monthly: 62, annual: 374 },
                medium: { name: 'B2ms', vcpu: 2, ram: '8GB', hourly: 0.0830, monthly: 125, annual: 750 },
                large: { name: 'D2s_v3', vcpu: 2, ram: '8GB', hourly: 0.096, monthly: 144, annual: 864 },
                xlarge: { name: 'D4s_v3', vcpu: 4, ram: '16GB', hourly: 0.192, monthly: 288, annual: 1728 }
            },
            storage: {
                standard: { price: 0.0184, name: 'Blob Hot' },
                ia: { price: 0.010, name: 'Blob Cool' },
                glacier: { price: 0.00099, name: 'Blob Archive' }
            }
        },
        gcp: {
            name: 'Google Cloud Platform',
            shortName: 'GCP',
            logo: '/assets/gcp-logo.svg',
            instances: {
                small: { name: 'e2-medium', vcpu: 2, ram: '4GB', hourly: 0.0416, monthly: 62, annual: 374 },
                medium: { name: 'e2-large', vcpu: 2, ram: '8GB', hourly: 0.0830, monthly: 125, annual: 750 },
                large: { name: 'n2-standard-2', vcpu: 2, ram: '8GB', hourly: 0.094, monthly: 141, annual: 846 },
                xlarge: { name: 'n2-standard-4', vcpu: 4, ram: '16GB', hourly: 0.188, monthly: 282, annual: 1692 }
            },
            storage: {
                standard: { price: 0.020, name: 'Cloud Storage Standard' },
                ia: { price: 0.010, name: 'Nearline' },
                glacier: { price: 0.004, name: 'Coldline' }
            }
        }
    };

    const CLOUD_MANAGEMENT_TIERS = {
        foundation: { name: 'Foundation Cloud', markupPercent: 15 },
        professional: { name: 'Professional Cloud', markupPercent: 25 },
        enterprise: { name: 'Enterprise Cloud', markupPercent: 35 }
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Format currency value
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat(CONFIG.locale, {
            style: 'currency',
            currency: CONFIG.currency,
            minimumFractionDigits: CONFIG.decimalPlaces,
            maximumFractionDigits: CONFIG.decimalPlaces
        }).format(amount);
    }

    /**
     * Calculate annual price with discount
     * @param {number} monthlyPrice - Monthly price
     * @returns {number} Annual price
     */
    function calculateAnnualPrice(monthlyPrice) {
        const discount = monthlyPrice * (CONFIG.annualDiscountPercent / 100);
        return (monthlyPrice - discount) * 12;
    }

    /**
     * Validate numeric input
     * @param {*} value - Value to validate
     * @returns {number} Validated number or 0
     */
    function validateNumber(value) {
        const num = parseFloat(value);
        return isNaN(num) || num < 0 ? 0 : num;
    }

    // ============================================
    // CALCULATION FUNCTIONS
    // ============================================

    /**
     * Calculate managed services pricing
     * @param {Object} inputs - Calculation inputs
     * @returns {Object} Calculation results
     */
    function calculateManagedServices(inputs) {
        const tier = MANAGED_SERVICES_TIERS[inputs.tier];
        if (!tier) {
            throw new Error('Invalid tier selected');
        }

        const users = validateNumber(inputs.users);
        const servers = {
            basic: validateNumber(inputs.basicServers),
            application: validateNumber(inputs.appServers),
            database: validateNumber(inputs.dbServers),
            compliance: validateNumber(inputs.compServers)
        };

        // Calculate user costs
        const monthlyUsersCost = users * tier.monthlyPrice;
        const annualUsersCost = users * tier.annualPrice * 12;

        // Calculate server costs (applying included servers)
        let serverCostMonthly = 0;
        let serverCostAnnual = 0;
        
        Object.keys(servers).forEach(type => {
            const count = servers[type];
            if (count > 0) {
                const serverPrice = tier.servers[type].price;
                serverCostMonthly += count * serverPrice;
                serverCostAnnual += count * serverPrice * 12;
            }
        });

        // Apply included servers discount
        const includedCount = tier.includedServers;
        const totalServers = Object.values(servers).reduce((a, b) => a + b, 0);
        
        // Calculate total
        const monthlyTotal = monthlyUsersCost + serverCostMonthly;
        const annualTotal = annualUsersCost + serverCostAnnual;

        return {
            tier: tier.name,
            users: users,
            servers: servers,
            subtotal: {
                users: { monthly: monthlyUsersCost, annual: annualUsersCost },
                servers: { monthly: serverCostMonthly, annual: serverCostAnnual }
            },
            totals: {
                monthly: monthlyTotal,
                annual: annualTotal,
                monthlyPerUser: users > 0 ? monthlyTotal / users : 0
            },
            savings: {
                annualVsMonthly: (monthlyTotal * 12) - annualTotal,
                includedServers: includedCount
            },
            features: tier.features,
            popular: tier.popular || false
        };
    }

    /**
     * Calculate cloud pricing
     * @param {Object} inputs - Cloud calculation inputs
     * @returns {Object} Cloud calculation results
     */
    function calculateCloudPricing(inputs) {
        const provider = CLOUD_PROVIDERS[inputs.provider];
        if (!provider) {
            throw new Error('Invalid cloud provider');
        }

        const managementTier = CLOUD_MANAGEMENT_TIERS[inputs.managementTier];
        
        const instanceSize = provider.instances[inputs.size];
        if (!instanceSize) {
            throw new Error('Invalid instance size');
        }

        const storageGB = validateNumber(inputs.storageGB);
        const storageTier = provider.storage[inputs.storageType] || provider.storage.standard;

        // Calculate raw cloud costs
        const computeMonthly = instanceSize.monthly;
        const storageMonthly = storageGB * storageTier.price;
        const rawCloudMonthly = computeMonthly + storageMonthly;

        // Apply Vantus management markup
        const managementFee = rawCloudMonthly * (managementTier.markupPercent / 100);
        const vantusTotal = rawCloudMonthly + managementFee;

        // Annual costs
        const computeAnnual = instanceSize.annual;
        const storageAnnual = storageGB * storageTier.price * 12;
        const rawCloudAnnual = computeAnnual + storageAnnual;
        const managementAnnual = rawCloudAnnual * (managementTier.markupPercent / 100);
        const vantusTotalAnnual = rawCloudAnnual + managementAnnual;

        return {
            provider: provider.shortName,
            providerFull: provider.name,
            instance: instanceSize,
            storage: {
                gb: storageGB,
                tier: storageTier.name,
                monthly: storageMonthly,
                annual: storageAnnual
            },
            management: {
                tier: managementTier.name,
                markupPercent: managementTier.markupPercent,
                fee: managementFee
            },
            costs: {
                rawCloud: { monthly: rawCloudMonthly, annual: rawCloudAnnual },
                vantusManaged: { monthly: vantusTotal, annual: vantusTotalAnnual },
                savings: vantusTotalAnnual - vantusTotalAnnual * 0.9 // Assume 10% optimization savings
            },
            totals: {
                monthly: vantusTotal,
                annual: vantusTotalAnnual
            }
        };
    }

    // ============================================
    // UI RENDERING
    // ============================================

    /**
     * Render pricing results to DOM
     * @param {Object} results - Calculation results
     * @param {string} containerId - Container element ID
     */
    function renderResults(results, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = `
            <div class="pricing-results">
                <div class="tier-header ${results.popular ? 'popular' : ''}">
                    <h3>${results.tier}</h3>
                    ${results.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
                </div>
                
                <div class="price-display">
                    <div class="monthly-price">
                        <span class="amount">${formatCurrency(results.totals.monthly)}</span>
                        <span class="period">/month</span>
                    </div>
                    <div class="annual-price">
                        <span class="label">Annual:</span>
                        <span class="amount">${formatCurrency(results.totals.annual)}</span>
                        <span class="savings">(Save ${formatCurrency(results.savings.annualVsMonthly)})</span>
                    </div>
                </div>

                <div class="breakdown">
                    <div class="breakdown-item">
                        <span class="label">Users (${results.users})</span>
                        <span class="value">${formatCurrency(results.subtotal.users.monthly)}/mo</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="label">Servers</span>
                        <span class="value">${formatCurrency(results.subtotal.servers.monthly)}/mo</span>
                    </div>
                </div>

                <div class="features">
                    <h4>Included:</h4>
                    <ul>
                        ${results.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>

                <button class="cta-button">Get Started with ${results.tier}</button>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================
    // PUBLIC API
    // ============================================

    const VantusPricing = {
        config: CONFIG,
        
        // Data
        tiers: MANAGED_SERVICES_TIERS,
        cloudProviders: CLOUD_PROVIDERS,
        cloudManagement: CLOUD_MANAGEMENT_TIERS,
        
        // Methods
        calculateManagedServices,
        calculateCloudPricing,
        formatCurrency,
        
        // UI
        renderResults,

        // Version
        version: '2.0.0'
    };

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = VantusPricing;
    } else {
        global.VantusPricing = VantusPricing;
    }

})(typeof window !== 'undefined' ? window : this);
