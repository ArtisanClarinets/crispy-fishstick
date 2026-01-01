# Mission Plan: Living Blueprint Implementation

## Goal
Ship a "Lusion-level" homepage experience with a Sticky Scroll "Living Blueprint" section driving a self-hosted Spline scene.

## Phases

### A. Baseline & Setup
- [ ] Initialize agent context files.
- [ ] Run baseline checks (node, npm, lint, build, test).
- [ ] Record findings in .agent/VERIFY.md.

### B. Tooling Fix
- [ ] Check for ESLint 9 vs Next.js compatibility issues.
- [ ] Fix if found (likely downgrade to ESLint 8 or config adjustment).
- [ ] Verify clean lint and build.

### C. Spline Integration
- [ ] Install @splinetool/react-spline @splinetool/runtime.
- [ ] Create components/spline-blueprint-canvas.tsx.
- [ ] Implement robust loading, error handling, and variable control (phase, progress).

### D. Sticky Scroll Section
- [ ] Create components/living-blueprint-section.tsx.
- [ ] Implement Desktop Sticky Layout (50/50).
- [ ] Implement Mobile Fallback.
- [ ] Implement Scroll Logic (Phase 0-7).

### E. Homepage Wiring
- [ ] Update app/page.tsx to include the new section.

### F. Verification
- [ ] Update Playwright tests.
- [ ] Verify UI logic.

### G. Final Polish
- [ ] Ensure 0 errors/warnings in all steps.
