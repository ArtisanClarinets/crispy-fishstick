# Vantus Care Suite Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean legacy Care references, complete the remaining commercial pack, and publish a board-ready master index aligned to the enterprise pack.

**Architecture:** Keep `care/` as the canonical operational and commercial Care layer while `enterprise_pack/` remains the strategy and offer-governance layer. Normalize taxonomy and references first, then add missing commercial documents, then publish a master index that reflects the canonical structure.

**Tech Stack:** Markdown, YAML, JSON, shell verification

---

### Task 1: Legacy Care cleanup
- Inspect `docs/care/sops/` and `docs/care/templates/` for deprecated tier names, old `ops/templates/care` and `ops/checklists/care` paths, and stale `pricing_public.yaml` references.
- Replace canonical tier naming with `Foundation`, `Advanced`, and `Sovereign` where the text refers to Care tiers.
- Replace old internal references with current `templates/...`, `checklists/...`, or `pricing/...` paths.

### Task 2: Commercial pack expansion
- Create `docs/care/commercial/TPL-CARE-MSA.md`.
- Create `docs/care/commercial/TPL-CARE-SERVICE-ORDER.md`.
- Create `docs/care/commercial/CARE_QUOTE_ASSUMPTIONS_LIBRARY.md`.
- Create `docs/care/commercial/CARE_DISCOUNT_GOVERNANCE.md`.

### Task 3: Master index publication
- Create `docs/care/MASTER_INDEX.md`.
- Make it board-ready and client-ready: explain purpose, structure, commercial layer, pricing layer, ops layer, and how Care aligns with enterprise-pack.

### Task 4: Verification and memory update
- Re-scan `care/sops/` and `care/templates/` for the known legacy patterns.
- Verify all new commercial and index files exist.
- Update `.kilocode/rules/memory-bank/context.md`.
