# Complexity Scoring Model

**Purpose:** Standardize complexity assessment for accurate scoping and margin protection  
**Applies to:** All Vantus Systems build projects  
**Last Updated:** March 2026

---

## Overview

This model provides a structured framework for assessing project complexity across six dimensions. The resulting score determines the complexity level and corresponding price adjustment multiplier, ensuring:

- **Accurate scoping** - Projects are assessed consistently
- **Margin protection** - Complex projects receive appropriate premiums
- **Transparent pricing** - Clients understand what drives cost
- **Fair pricing** - Simple projects aren't overcharged

**Related:** [FINALIZED_PRICING_STRATEGY_NO_CARE.md](FINALIZED_PRICING_STRATEGY_NO_CARE.md)

---

## Complexity Dimensions

Each dimension is scored 1-5. Total possible score: 6-30.

### Dimension 1: Content Volume

| Score | Level      | Description                        | Indicators                                                     |
| ----- | ---------- | ---------------------------------- | -------------------------------------------------------------- |
| 1     | Small      | 5-10 pages, simple content         | Brochure site, single service offering, minimal copy needs     |
| 2     | Medium     | 10-25 pages, moderate content      | Multi-service site, some custom copy, basic blog               |
| 3     | Large      | 25-50 pages, complex content       | Multiple service lines, case studies, resource center          |
| 4     | Very Large | 50-100 pages, varied content types | Multiple content workflows, team bios, extensive resources     |
| 5     | Enterprise | 100+ pages, multiple content types | Full content ecosystem, multiple workflows, content governance |

**Scoring Guidance:**

- Count all unique URLs that will exist at launch
- Include blog posts only if creating 10+ as part of project
- Factor in content creation effort (client-provided vs. Vantus-created)

---

### Dimension 2: Integration Complexity

| Score | Level      | Description                                 | Indicators                                                                 |
| ----- | ---------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| 1     | None       | Standalone website                          | No third-party connections required                                        |
| 2     | Basic      | 1-2 simple integrations                     | Contact forms, Google Analytics, basic email capture                       |
| 3     | Moderate   | 3-4 integrations                            | CRM integration, email marketing, scheduling, analytics suite              |
| 4     | Complex    | 5+ integrations, bidirectional sync         | Multiple systems talking to each other, data flowing both ways             |
| 5     | Enterprise | Custom APIs, legacy systems, real-time sync | Custom API development, legacy system integration, real-time data exchange |

**Scoring Guidance:**

- Each unique third-party system counts as one integration
- Bidirectional sync (data flowing both ways) increases complexity
- Custom API development automatically scores 4 or higher
- Legacy system integration automatically scores 5

---

### Dimension 3: Custom Functionality

| Score | Level      | Description                                 | Indicators                                                       |
| ----- | ---------- | ------------------------------------------- | ---------------------------------------------------------------- |
| 1     | Minimal    | Standard CMS features                       | Basic pages, blog, contact form - no custom development          |
| 2     | Light      | Custom forms, basic workflows               | Custom form logic, simple approval flows, calculators            |
| 3     | Moderate   | Customer portal, user accounts              | User authentication, role-based access, customer dashboard       |
| 4     | Heavy      | Admin portal, complex workflows             | Internal tools, multi-step workflows, automation rules           |
| 5     | Enterprise | Multi-system workflows, advanced automation | Complex business logic, multiple user types, advanced automation |

**Scoring Guidance:**

- User authentication (login system) automatically scores 3+
- Multiple user roles (admin, manager, user) increases score
- Workflow automation (if X then Y) increases score
- Custom admin interfaces automatically score 4+

---

### Dimension 4: Migration Complexity

| Score | Level      | Description                           | Indicators                                                     |
| ----- | ---------- | ------------------------------------- | -------------------------------------------------------------- |
| 1     | None       | New site, no migration                | Starting from scratch, no existing content to move             |
| 2     | Simple     | Static content, easy export           | Basic HTML site, content easily copy-pasted                    |
| 3     | Moderate   | CMS content, restructuring needed     | WordPress to new CMS, content reorganization required          |
| 4     | Complex    | Multiple systems, data transformation | Multiple source systems, data cleaning, format conversion      |
| 5     | Enterprise | Legacy systems, complex data mapping  | Custom/proprietary systems, complex data relationships, audits |

**Scoring Guidance:**

- If client has existing site, minimum score is 2
- Multiple source systems (old site + CRM + spreadsheets) increases score
- Data transformation (changing formats, cleaning data) increases score
- Legacy/proprietary systems automatically score 5

---

### Dimension 5: Compliance Requirements

| Score | Level      | Description                    | Indicators                                          |
| ----- | ---------- | ------------------------------ | --------------------------------------------------- |
| 1     | None       | Standard website               | No special compliance requirements                  |
| 2     | Basic      | Privacy policy, cookie consent | GDPR basics, cookie banner, privacy policy page     |
| 3     | Moderate   | Accessibility WCAG 2.1 AA      | Full accessibility audit and remediation required   |
| 4     | High       | HIPAA, PCI, or SOC 2           | Single compliance framework with audit requirements |
| 5     | Enterprise | Multiple compliance frameworks | Multiple frameworks (HIPAA + SOC 2), regular audits |

**Scoring Guidance:**

- Healthcare clients handling PHI automatically score 4+
- E-commerce with payment processing requires PCI (score 4)
- Government contracts often require accessibility (score 3)
- Multiple frameworks compound complexity

---

### Dimension 6: Timeline Pressure

| Score | Level     | Description                     | Indicators                                        |
| ----- | --------- | ------------------------------- | ------------------------------------------------- |
| 1     | Flexible  | 3+ months, no rush              | Client has no hard deadline, flexible schedule    |
| 2     | Normal    | 2-3 months, standard timeline   | Typical project timeline, reasonable expectations |
| 3     | Moderate  | 6-8 weeks, some pressure        | Compressed timeline, some deadline constraints    |
| 4     | Tight     | 4-6 weeks, significant pressure | Hard deadline, limited buffer, event-driven       |
| 5     | Emergency | <4 weeks, expedited delivery    | Crisis response, immediate need, rush delivery    |

**Scoring Guidance:**

- Hard deadlines (events, product launches) increase score
- Compressed timelines require additional resources
- Rush delivery increases risk and coordination overhead
- Consider team availability and current pipeline

---

## Scoring Logic

### Total Score Calculation

```
Total Score = D1 + D2 + D3 + D4 + D5 + D6
```

Where D1-D6 are individual dimension scores (1-5 each).

**Possible Range:** 6 (minimum) to 30 (maximum)

### Complexity Level Determination

| Total Score | Complexity Level | Description                                     |
| ----------- | ---------------- | ----------------------------------------------- |
| 6-10        | Low              | Straightforward project, minimal complexity     |
| 11-18       | Medium           | Standard project, typical complexity            |
| 19-24       | High             | Complex project, significant challenges         |
| 25-30       | Very High        | Enterprise-grade complexity, maximum challenges |

---

## Price Adjustment Multipliers

Complexity level determines the price adjustment multiplier applied to the base package range.

| Complexity Level | Score Range | Multiplier | Effect             | Rationale                                    |
| ---------------- | ----------- | ---------- | ------------------ | -------------------------------------------- |
| Low              | 6-10        | 1.0x       | Base range applies | Simpler projects require standard effort     |
| Moderate         | 11-15       | 1.2x       | 20% premium        | Additional complexity above standard         |
| High             | 16-20       | 1.4x       | 40% premium        | Significant expertise and resources required |
| Very High        | 21-25       | 1.6x       | 60% premium        | Maximum complexity, dedicated resources      |
| Extreme          | 26-30       | 1.8x+      | 80%+ premium       | Requires detailed discovery phase            |

### How to Apply Multipliers

1. **Identify base package** (Rebuild, CMS, or Portal)
2. **Get base price range** from pricing strategy
3. **Calculate complexity score** using this model
4. **Determine complexity level** from total score
5. **Apply multiplier** to upper range of base price

**Example:**

- Base package: Website + CMS ($32,000-$125,000)
- Complexity score: 17 (High complexity)
- Multiplier: 1.4x
- Adjusted range: $32,000-$175,000

---

## Example Calculations

### Example 1: Regional Law Firm

**Client Scenario:**
Regional law firm (15 attorneys) needs website rebuild with attorney bios, practice area pages, and blog. They want to integrate with their CRM (HubSpot) for lead tracking and have a hard deadline for a partner conference in 10 weeks.

**Dimension Scores:**

| Dimension               | Score  | Justification                                              |
| ----------------------- | ------ | ---------------------------------------------------------- |
| Content Volume          | 3      | 35 pages (15 bios + 10 practice areas + 10 resource pages) |
| Integration Complexity  | 2      | HubSpot CRM + Google Analytics                             |
| Custom Functionality    | 2      | Custom contact forms with routing logic                    |
| Migration Complexity    | 3      | Existing WordPress site, content restructuring needed      |
| Compliance Requirements | 2      | Privacy policy, cookie consent, attorney advertising rules |
| Timeline Pressure       | 3      | 10-week deadline for conference                            |
| **Total Score**         | **15** |                                                            |

**Results:**

- **Complexity Level:** Medium (11-18)
- **Multiplier:** 1.0x (base pricing)
- **Base Package:** Website Rebuild ($15,000-$55,000)
- **Adjusted Range:** $15,000-$55,000

**Recommendation:** Quote in $35,000-$45,000 range, positioning toward middle of range.

---

### Example 2: Healthcare Practice

**Client Scenario:**
Multi-location healthcare practice (5 locations) needs website + patient portal. Must be HIPAA compliant, integrate with their EHR system, and migrate content from 3 different legacy sites. Timeline is flexible.

**Dimension Scores:**

| Dimension               | Score  | Justification                                                          |
| ----------------------- | ------ | ---------------------------------------------------------------------- |
| Content Volume          | 4      | 75 pages (5 location pages + services + providers + resources)         |
| Integration Complexity  | 4      | EHR integration (bidirectional), patient portal, scheduling, analytics |
| Custom Functionality    | 4      | Patient portal with appointment scheduling, secure messaging           |
| Migration Complexity    | 4      | 3 legacy sites, data transformation required                           |
| Compliance Requirements | 4      | HIPAA compliance, audit trails, BAA required                           |
| Timeline Pressure       | 1      | Flexible timeline, no hard deadline                                    |
| **Total Score**         | **21** |                                                                        |

**Results:**

- **Complexity Level:** Very High (21-25)
- **Multiplier:** 1.6x
- **Base Package:** Website + Business Portal ($90,000-$400,000)
- **Adjusted Range:** $90,000-$640,000

**Recommendation:** Quote in $275,000-$350,000 range, emphasizing HIPAA compliance and EHR integration expertise.

---

### Example 3: E-commerce Brand

**Client Scenario:**
DTC e-commerce brand needs website rebuild with product catalog (no checkout), integration with Shopify for inventory sync, Klaviyo for email, and migration from Squarespace. They need to launch before holiday season in 6 weeks.

**Dimension Scores:**

| Dimension               | Score  | Justification                                                |
| ----------------------- | ------ | ------------------------------------------------------------ |
| Content Volume          | 3      | 40 pages (products, about, blog, support)                    |
| Integration Complexity  | 3      | Shopify inventory sync, Klaviyo, analytics, reviews platform |
| Custom Functionality    | 2      | Product filtering, custom product display logic              |
| Migration Complexity    | 2      | Squarespace export, straightforward content migration        |
| Compliance Requirements | 2      | Privacy policy, cookie consent, CCPA basics                  |
| Timeline Pressure       | 4      | 6-week deadline for holiday season                           |
| **Total Score**         | **16** |                                                              |

**Results:**

- **Complexity Level:** Medium (11-18)
- **Multiplier:** 1.0x
- **Base Package:** Website Rebuild ($15,000-$55,000)
- **Adjusted Range:** $15,000-$55,000

**Recommendation:** Quote in $40,000-$50,000 range. Timeline pressure is offset by simpler migration and moderate integrations.

---

### Example 4: Manufacturing Company

**Client Scenario:**
Mid-size manufacturer needs website + customer portal for order tracking, inventory visibility, and document management. Integrates with ERP (SAP), legacy CRM, and document management system. Must be SOC 2 compliant. 12-week timeline.

**Dimension Scores:**

| Dimension               | Score  | Justification                                                       |
| ----------------------- | ------ | ------------------------------------------------------------------- |
| Content Volume          | 4      | 60 pages (products, resources, documentation center)                |
| Integration Complexity  | 5      | SAP ERP, legacy CRM, document management, real-time inventory       |
| Custom Functionality    | 5      | Customer portal with order tracking, inventory, document management |
| Migration Complexity    | 4      | Multiple source systems, data transformation                        |
| Compliance Requirements | 4      | SOC 2 compliance, audit requirements                                |
| Timeline Pressure       | 3      | 12-week timeline, moderate pressure                                 |
| **Total Score**         | **25** |                                                                     |

**Results:**

- **Complexity Level:** Very High (21-25)
- **Multiplier:** 1.6x
- **Base Package:** Website + Business Portal ($90,000-$400,000)
- **Adjusted Range:** $90,000-$640,000

**Recommendation:** Quote in $450,000-$550,000 range. Enterprise-grade complexity justifies premium pricing. Consider phased approach.

---

## Usage Guidelines

### When to Apply Complexity Scoring

| Stage                     | Action                                               |
| ------------------------- | ---------------------------------------------------- |
| **Initial Qualification** | Quick mental assessment to validate budget alignment |
| **Discovery Call**        | Preliminary scoring to set expectations              |
| **Paid Discovery**        | Formal scoring with client input                     |
| **Proposal Creation**     | Final scoring documented in proposal                 |
| **Contract Signing**      | Complexity score recorded in contract                |

### Who Should Perform Scoring

| Role                    | Responsibility                                 |
| ----------------------- | ---------------------------------------------- |
| **Sales/BD**            | Initial qualification scoring (rough estimate) |
| **Solutions Architect** | Formal scoring during paid discovery           |
| **Project Manager**     | Validate scoring at project kickoff            |
| **Client Success**      | Reference for change order discussions         |

### How to Communicate to Clients

**Do:**

- Explain that complexity scoring ensures accurate scoping
- Walk through each dimension and your assessment
- Invite client input on scores (they may know things you don't)
- Use scoring to justify price range and set expectations
- Document agreed scores in proposal

**Don't:**

- Present scoring as a rigid formula
- Surprise clients with scores at proposal stage
- Score without client context
- Use scoring to artificially inflate prices

**Sample Language:**

> "To ensure we scope this accurately, we use a complexity assessment framework. Based on our discussion, I'm seeing this as a [Medium] complexity project. Here's why: [walk through dimensions]. Does this align with your expectations?"

### When to Override Scoring

| Situation                 | Override Direction | Justification                                 |
| ------------------------- | ------------------ | --------------------------------------------- |
| Strategic account         | Lower              | Long-term relationship value                  |
| Reference customer        | Lower              | Marketing value of case study                 |
| Repeat customer           | Lower              | Reduced onboarding, established trust         |
| High-risk client          | Higher             | Communication challenges, scope creep history |
| Technical debt discovery  | Higher             | Uncovered complexity during discovery         |
| Client budget constraints | Lower              | With scope reduction, not price reduction     |

**Important:** Document all overrides with clear justification. Pattern of overrides indicates model needs adjustment.

---

## Decision Framework

### Quick Assessment Flowchart

```
START
  │
  ├─ Is this a rebuild only (no portal, no custom functionality)?
  │   └─ YES → Likely Low-Medium complexity
  │   └─ NO → Continue
  │
  ├─ Does client need user accounts/login?
  │   └─ YES → Minimum Medium complexity (score 3+ on D3)
  │   └─ NO → Continue
  │
  ├─ Are there compliance requirements (HIPAA, PCI, SOC 2)?
  │   └─ YES → Minimum High complexity (score 4+ on D5)
  │   └─ NO → Continue
  │
  ├─ Is timeline < 6 weeks?
  │   └─ YES → Add 1-2 points to timeline score
  │   └─ NO → Standard timeline scoring
  │
  └─ Complete full scoring assessment
```

### Red Flag Indicators

If any of these are present, automatically score 4+ on relevant dimension:

| Red Flag                            | Dimension     | Minimum Score |
| ----------------------------------- | ------------- | ------------- |
| HIPAA compliance required           | Compliance    | 4             |
| Multiple legacy system integrations | Integration   | 4             |
| Custom API development              | Integration   | 4             |
| User authentication required        | Functionality | 3             |
| Hard deadline < 6 weeks             | Timeline      | 4             |
| 100+ pages at launch                | Content       | 5             |
| Multiple compliance frameworks      | Compliance    | 5             |

---

## Appendix A: Scoring Worksheet

Use this worksheet during client discovery calls:

```
CLIENT: ________________________  DATE: ____________
PACKAGE: □ Rebuild  □ CMS  □ Portal

DIMENSION SCORES:
┌─────────────────────────┬───────┬────────────────────┐
│ Dimension               │ Score │ Notes              │
├─────────────────────────┼───────┼────────────────────┤
│ D1: Content Volume      │ __/5  │                    │
│ D2: Integration         │ __/5  │                    │
│ D3: Custom Functionality│ __/5  │                    │
│ D4: Migration           │ __/5  │                    │
│ D5: Compliance          │ __/5  │                    │
│ D6: Timeline            │ __/5  │                    │
├─────────────────────────┼───────┼────────────────────┤
│ TOTAL SCORE             │ __/30 │                    │
└─────────────────────────┴───────┴────────────────────┘

COMPLEXITY LEVEL: □ Low (6-10)  □ Medium (11-18)  □ High (19-24)  □ Very High (25-30)

MULTIPLIER: ____________

BASE RANGE: $________ - $________
ADJUSTED RANGE: $________ - $________

RECOMMENDED QUOTE: $________ - $________

OVERRIDES/APPROVALS:
_____________________________________________________________
```

---

## Appendix B: Integration Complexity Reference

Common integrations and their typical complexity contribution:

| Integration Type                        | Typical Score Contribution |
| --------------------------------------- | -------------------------- |
| Google Analytics                        | +0.5 (part of basic)       |
| Contact form (email)                    | +0.5 (part of basic)       |
| Newsletter signup (Mailchimp)           | +0.5 (part of basic)       |
| CRM integration (HubSpot/Salesforce)    | +1.0                       |
| Email marketing (Klaviyo/Mailchimp Pro) | +0.5                       |
| Scheduling (Calendly/Acuity)            | +0.5                       |
| Payment processing (Stripe)             | +1.0                       |
| EHR/EMR integration                     | +2.0                       |
| ERP integration (SAP/NetSuite)          | +2.0                       |
| Custom API development                  | +2.0                       |
| Legacy system integration               | +2.5                       |
| Real-time bidirectional sync            | +1.5                       |

**Note:** These are guidelines. Actual complexity depends on specific requirements.

---

## Appendix C: Compliance Requirements Reference

| Compliance Type                 | Score | Key Requirements                            |
| ------------------------------- | ----- | ------------------------------------------- |
| Privacy Policy + Cookie Consent | 2     | GDPR/CCPA basics, cookie banner             |
| WCAG 2.1 AA Accessibility       | 3     | Full audit, remediation, testing            |
| HIPAA                           | 4     | PHI handling, BAA, audit trails, encryption |
| PCI DSS                         | 4     | Payment data security, SAQ completion       |
| SOC 2                           | 4     | Security controls, audit preparation        |
| FedRAMP                         | 5     | Government cloud security                   |
| Multiple frameworks             | 5     | Compound complexity                         |

---

## Document Control

| Version | Date       | Author              | Changes         |
| ------- | ---------- | ------------------- | --------------- |
| 1.0     | March 2026 | Vantus Pricing Team | Initial release |

**Related Documents:**

- [FINALIZED_PRICING_STRATEGY_NO_CARE.md](FINALIZED_PRICING_STRATEGY_NO_CARE.md)
- [pricing_ops.yaml](pricing_ops.yaml)
- [pricing_public.yaml](pricing_public.yaml)

**Questions:** Contact the Solutions Architecture team for scoring guidance.
