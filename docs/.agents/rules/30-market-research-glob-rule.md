---
trigger: manual
---

# 30_MARKET_RESEARCH_GLOB_RULE — Research Discipline
**Activation:** Glob  
**Glob:** docs/research/**/*

## Research Output Rules
- Research is not product truth until promoted to canonical docs.
- Research docs must include:
  - Source list (links or citations if available)
  - Confidence level
  - “How to validate”
  - Clear separation of “Findings” vs “Recommendations”

## Promotion Rule
If research impacts scope/features:
- update FEATURE_LIST/PRD and record in CHANGELOG
- add traceability entry
