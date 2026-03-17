Vantus Systems — Pricing Assumptions (Draft)

Source: vantus_pricing_analysis.md

Purpose: Document assumptions used to convert published prices into cost/margin calculations for pricing_model.csv.

Key assumptions (defaults used if no company inputs provided):

1) Labor costs
- Average technician fully-loaded cost: See pricing/pricing_public.yaml/hour
- Average senior engineer fully-loaded cost: See pricing/pricing_public.yaml/hour

2) Support mix (by ticket/time)
- Remote helpdesk (per user): 30 minutes/month average technician time per user
- On-site visits: 0.05 visits/user/month average (1 per 20 users per month) at 2 hours per visit

3) Server costs (infrastructure + monitoring + backup)
- Basic server total delivery cost: See pricing/pricing_public.yaml/month
- Application server total delivery cost: See pricing/pricing_public.yaml/month
- Database server total delivery cost: See pricing/pricing_public.yaml/month
- Compliance hardened server cost: See pricing/pricing_public.yaml/month

4) Software & vendor costs per user
- EDR & endpoint licensing: $6/user/month
- Email security gateway: $3/user/month
- Password manager: $1/user/month
- VoIP per-user cost (carrier & SIP trunk): $8/user/month
- Backup storage: $5/TB/user/month (1TB included for Foundation)

5) Overhead & fixed costs allocation
- General & Administrative overhead allocation to COGS: 12% of service revenue

6) Gross margin targets (from pricing analysis)
- Foundation: 40% target
- Professional: 50% target
- Enterprise: 55% target

Notes & required confirmations:
- These are conservative, illustrative assumptions. Please confirm actual labor fully-loaded rates and vendor contract prices to finalize.
- All assumptions will be explicitly captured in pricing_model.csv and pricing_assumptions.md with calculation formulas.

Created by: Enterprise Orchestrator Agent
Date: 2026-02-20


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
