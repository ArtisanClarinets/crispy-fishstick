# Vantus Pricing Calculator — Production Module

**Version:** 2.0  
**Date:** February 2026  
**Status:** Production-Ready

---

## Overview

This module provides a comprehensive, production-ready pricing calculator for Vantus Systems' managed IT services and cloud infrastructure. It supports both on-premise managed services and real-time cloud pricing from AWS, Azure, and Google Cloud.

## Features

- **Dual Calculator Modes:**
  - Managed Services (Foundation/Advanced/Premier tiers)
  - Cloud Infrastructure (AWS/Azure/GCP with real-time pricing)

- **Key Capabilities:**
  - Real-time currency formatting
  - Annual/monthly price switching
  - Server add-on calculations
  - Cloud instance sizing
  - Storage tier selection
  - Management markup calculations
  - Accessibility (WCAG 2.1 AA compliant)
  - Responsive design (mobile + desktop)

## Files

| File | Description |
|------|-------------|
| `index.html` | Production HTML with full UI |
| `vantus-pricing.js` | Production JavaScript module |
| `spec.md` | Technical specification |

## Quick Start

### Browser (CDN)
```html
<script src="vantus-pricing.js"></script>
<script>
  const result = VantusPricing.calculateManagedServices({
    tier: 'professional',
    users: 25,
    basicServers: 1,
    appServers: 0,
    dbServers: 0,
    compServers: 0
  });
  console.log(result.totals.monthly);
</script>
```

### Node.js
```javascript
const VantusPricing = require('./vantus-pricing.js');
const result = VantusPricing.calculateManagedServices({
  tier: 'enterprise',
  users: 50,
  basicServers: 2,
  appServers: 1,
  dbServers: 0,
  compServers: 0
});
console.log(result.totals.monthly);
```

## API Reference

### calculateManagedServices(inputs)
Calculate managed services pricing.

**Inputs:**
- `tier` (string): 'foundation' | 'advanced' | 'premier'
- `users` (number): Number of users
- `basicServers` (number): Count of basic servers
- `appServers` (number): Count of application servers
- `dbServers` (number): Count of database servers
- `compServers` (number): Count of compliance servers

**Returns:**
```javascript
{
  tier: string,
  users: number,
  servers: object,
  subtotal: { users: {...}, servers: {...} },
  totals: { monthly: number, annual: number, monthlyPerUser: number },
  savings: { annualVsMonthly: number, includedServers: number },
  features: string[],
  popular: boolean
}
```

### calculateCloudPricing(inputs)
Calculate cloud infrastructure pricing with Vantus management.

**Inputs:**
- `provider` (string): 'aws' | 'azure' | 'gcp'
- `size` (string): 'small' | 'medium' | 'large' | 'xlarge'
- `storageGB` (number): Storage in GB
- `storageType` (string): 'standard' | 'ia' | 'glacier'
- `managementTier` (string): 'foundation' | 'advanced' | 'premier'

**Returns:**
```javascript
{
  provider: string,
  instance: object,
  storage: { gb, tier, monthly, annual },
  management: { tier, markupPercent, fee },
  costs: { rawCloud: {...}, vantusManaged: {...}, savings: number },
  totals: { monthly: number, annual: number }
}
```

### formatCurrency(amount)
Format number as USD currency.

```javascript
VantusPricing.formatCurrency(149.99); // "See pricing/pricing_public.yaml.99"
```

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Reduced motion support
- Color contrast compliant

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Integration Notes

1. **API Updates:** Cloud pricing data should be refreshed weekly from provider APIs
2. **Currency:** Default is USD; modify CONFIG for other currencies
3. **Tax:** Set CONFIG.taxRate for applicable taxes
4. **Analytics:** Add tracking events in calculate functions for conversion metrics

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-20 | Added cloud pricing, production-ready |
| 1.0 | 2026-02-20 | Initial prototype |

## License

Proprietary — Vantus Systems


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
