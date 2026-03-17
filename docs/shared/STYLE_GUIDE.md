# Vantus Documentation Style Guide

## Purpose

This style guide establishes consistent terminology, tone, and writing standards for all Vantus Systems documentation. It ensures clarity, professionalism, and alignment with our brand positioning.

---

## Approved Terminology

### Core Concepts

| Term                            | Definition                                                                                    | Usage Context                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Client-Owned Infrastructure** | Systems and infrastructure that clients own, operate, and control directly                    | Service descriptions, proposals, architecture docs |
| **Client Independence Roadmap** | Our 5-phase delivery process that progressively transfers knowledge and control to the client | Project planning, client onboarding                |
| **Owner Handoff Package**       | Complete documentation, credentials, and transfer materials provided at project completion    | Deliverables, closeout procedures                  |
| **Exit-Ready Architecture**     | Systems designed from day one for easy migration or provider transition                       | Architecture docs, SOWs                            |
| **Verified Proof**              | Measurable, verifiable evidence of claims (Lighthouse scores, security headers, etc.)         | Marketing, security docs                           |
| **Security-by-Default**         | Security controls implemented as standard, not optional add-ons                               | Security policies, proposals                       |
| **Vendor Neutrality**           | Recommendations based on client needs, not vendor partnerships or incentives                  | Competitive positioning                            |
| **Transparent Pricing**         | Published baseline costs without mandatory contact forms                                      | Marketing, sales materials                         |
| **Portability Guarantee**       | Commitment to use open standards and avoid proprietary lock-in                                | Contracts, client covenants                        |

### Service Tiers (Vantus Care)

Use these exact names in all documentation:

- **Foundation** — Entry-level support tier
- **Advanced** — Mid-tier with enhanced response times
- **Sovereign** — Top-tier with the highest governance depth

**NEVER use:** Basic, Standard, Premium, Gold, Platinum, Enterprise (in Care context), or Independent Systems

### Client-Facing Service Lanes

| Lane                                    | Description                                | Starting Price                  |
| --------------------------------------- | ------------------------------------------ | ------------------------------- |
| Client-Owned Website Architecture       | High-performance, ownable web applications | See canonical pricing docs      |
| Cloud Infrastructure & Server Ownership | Self-hosted or cloud infrastructure        | See canonical pricing docs      |
| Internal Systems & Admin Portals        | Custom applications for team operations    | See canonical pricing docs      |
| Security Hardening & Compliance         | Assessment and remediation services        | See canonical pricing docs      |
| Data Migration & System Integration     | Moving and connecting systems              | See canonical pricing docs      |
| Vantus Care (Ongoing Support)           | Monthly support and maintenance            | See canonical Care pricing docs |

### Technical Terminology

| Term           | Definition                                                            |
| -------------- | --------------------------------------------------------------------- |
| **Next.js 16** | Our primary frontend framework (always specify version)               |
| **React 19**   | Core UI library (always specify version)                              |
| **PostgreSQL** | Primary database (self-hosted preferred)                              |
| **VPS**        | Virtual Private Server (preferred over "cloud instance")              |
| **CI/CD**      | Continuous Integration/Continuous Deployment (spell out on first use) |
| **ADR**        | Architecture Decision Record (spell out on first use)                 |

---

## Forbidden Terms

| Term                            | Replacement                      | Reason                          |
| ------------------------------- | -------------------------------- | ------------------------------- |
| Independent Systems             | Client-Owned / Client-Controlled | Brand positioning shift         |
| Owner-Controlled Infrastructure | Client-Owned Infrastructure      | Plain-language standard         |
| Independent Systems Bundle      | Owner Handoff Package            | Consistent with new terminology |
| Digital Independent Systems     | Client Data Ownership            | Clearer meaning                 |
| Basic (tier)                    | Foundation                       | Care service tier naming        |
| Standard (tier)                 | Advanced                         | Care service tier naming        |
| Premium (tier)                  | Sovereign                        | Care service tier naming        |
| Cloud-first                     | Cloud-optional                   | Emphasizes choice over mandate  |
| Managed services only           | Vendor-neutral options           | Avoids dependency framing       |
| Best-in-class                   | Specific metrics                 | Quantify claims                 |
| Industry-leading                | With proof                       | Must include verification       |
| Seamless                        | Smooth / Well-planned            | Overused, vague                 |
| Synergy                         | Integration / Collaboration      | Corporate jargon                |
| Leverage                        | Use / Utilize                    | Overused buzzword               |
| Holistic                        | Comprehensive / Complete         | Vague, overused                 |
| Disruptive                      | Innovative / New                 | Overused, often inaccurate      |
| Game-changing                   | Significant / Meaningful         | Hyperbole                       |
| World-class                     | With proof / A+ rated            | Must be verifiable              |
| Cutting-edge                    | Modern / Current                 | Cliché                          |

### Terms Requiring Caution

Use these only with specific supporting evidence:

- "Secure" → Include specific controls or certifications
- "Fast" → Include load time metrics
- "Reliable" → Include uptime statistics
- "Scalable" → Include capacity metrics
- "Compliant" → Specify which standards (HIPAA, SOC 2, CMMC)

---

## Writing Standards

### Reading Level

- **Client-facing docs:** 8th grade reading level (Flesch-Kincaid 60-70)
- **Technical specs:** 10th-12th grade, but define acronyms
- **SOPs:** 8th grade with clear step-by-step instructions

**Tools:** Use Hemingway Editor or Grammarly to verify readability.

### Voice and Tone

**Do:**

- Use active voice ("We configure the server" not "The server is configured")
- Be specific and concrete ("Lighthouse 95+" not "fast performance")
- Use "we" and "you" for client-facing content
- Lead with benefits, follow with features
- Acknowledge limitations honestly
- Include verification methods for claims

**Don't:**

- Use passive voice
- Make unverifiable claims
- Hide behind jargon
- Use fear-based selling
- Overpromise on outcomes
- Attack competitors personally

### Sentence Structure

- Keep sentences under 25 words when possible
- One idea per sentence
- Use bullet points for lists of 3+ items
- Break up paragraphs longer than 4 lines

### Formatting Standards

**Headers:**

- Use sentence case for headers ("Service catalog" not "Service Catalog")
- H1 for document title only
- H2 for major sections
- H3 for subsections
- H4 sparingly for specific details

**Lists:**

- Use unordered lists (bullets) for non-sequential items
- Use ordered lists (numbers) for sequential steps
- Keep list items parallel in structure
- Limit nested lists to 2 levels

**Tables:**

- Use for comparing 3+ items
- Include header row
- Left-align text, right-align numbers
- Keep column count to 5 or fewer

**Code Blocks:**

- Use fenced code blocks with language identifier
- Include comments for non-obvious steps
- Keep examples runnable where possible

### Numbers and Dates

- Write out numbers one through nine
- Use numerals for 10 and above
- Use numerals for percentages, measurements, and pricing
- Date format: Month Day, Year (February 21, 2026)
- Time format: 12-hour with AM/PM (2:30 PM)

### Acronyms

- Spell out on first use in each document
- Put acronym in parentheses after first use
- Example: "Continuous Integration/Continuous Deployment (CI/CD)"
- Common acronyms (URL, PDF, API) don't need spelling out

### Punctuation

- Use serial (Oxford) comma: "A, B, and C"
- Use em-dashes (—) for parenthetical statements with spaces around them
- Avoid semicolons in client-facing docs
- Limit exclamation points to one per document

---

## Document Structure Templates

### SOP Template

```markdown
# SOP-XXX: Title

**Document ID:** VS-DEPT-XXX  
**Version:** X.X.X  
**Effective Date:** Month Day, Year  
**Owner:** Role Name  
**Related Documents:** List related docs

---

## I. PURPOSE & SCOPE

What this procedure does and who it applies to.

## II. KEY PRINCIPLES

Connection to founding principles.

## III. ROLES & RESPONSIBILITIES

Who does what.

## IV. STEP-BY-STEP PROCEDURE

Numbered steps with checkboxes where applicable.

## V. TEMPLATES & CHECKLISTS

Reusable content.

## VI. SUCCESS CRITERIA

How to know it worked.

## VII. CHANGELOG

Version history table.
```

### Client Proposal Template

```markdown
# Service Proposal for [Client Name]

**Date:** Month Day, Year  
**Proposal Valid Until:** Month Day, Year  
**Prepared By:** Name, Title

---

## Executive Summary

One-paragraph overview.

## Understanding Your Needs

What we heard and how we address it.

## Proposed Solution

What we're delivering.

## Investment

Pricing with clear inclusions/exclusions.

## Timeline

Key milestones.

## Next Steps

How to proceed.
```

---

## Review Checklist

Before publishing any document, verify:

- [ ] Reading level appropriate for audience
- [ ] No forbidden terms used
- [ ] All acronyms defined on first use
- [ ] Active voice throughout
- [ ] Specific claims have verification methods
- [ ] Headers use sentence case
- [ ] Tables formatted correctly
- [ ] Code blocks have language identifiers
- [ ] Document control block complete
- [ ] Changelog updated
- [ ] Cross-references valid
<!-- RESOLVED PLACEHOLDER -->

---

## Version Control

| Version | Date       | Changes                      | Author                  |
| ------- | ---------- | ---------------------------- | ----------------------- |
| 1.0.0   | 2026-02-21 | Initial style guide creation | Documentation Architect |

---

**Questions?** Contact: documentation@vantus.systems

_This style guide is reviewed quarterly. Next review: May 21, 2026_

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
