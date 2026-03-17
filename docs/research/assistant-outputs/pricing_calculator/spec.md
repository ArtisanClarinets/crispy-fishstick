# Pricing Calculator — Technical Spec (Prototype)

Source files:
- docs/assistant-outputs/pricing_model.csv
- docs/assistant-outputs/pricing_calculator/index.html

Overview:
- Static client-side calculator that computes monthly and annual prices given number of users and server counts. Prices derived from pricing_model.csv and embedded in JS for prototype.

Formulas:
- users_monthly = users × tier.monthly_price
- users_annual = users × tier.annual_price
- server_monthly = sum(server_count[type] × tier.server_price[type])
- total_monthly = users_monthly + server_monthly
- total_annual = total_monthly × 12

Edge cases and behavior:
- included_servers is present in model; prototype does not apply included_servers across server types (future improvement: apply included servers to lowest-cost server types first or prorate by type).
- Negative inputs clamped to zero.

Integration notes:
- For website integration, move pricing_model.csv to a CDN or API endpoint and fetch dynamically.
- Ensure server inclusion logic is finalized before production.

Accessibility:
- Use ARIA live regions for dynamic result updates.

Security:
- No external calls required. Sanitize any user-provided inputs on the server if you implement a server-side calculator.
