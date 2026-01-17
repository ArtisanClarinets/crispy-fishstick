## 2026-01-14 - Standardizing Button Loading States
**Learning:** Inconsistent manual implementation of loading spinners in buttons leads to code duplication and visual inconsistencies (e.g., spacing, icon size).
**Action:** Implemented a reusable `loading` prop in the core `Button` component that handles the spinner injection and disabled state automatically. Future forms should use this prop instead of manually rendering `Loader2`.

## 2026-01-20 - Feedback for Sensitive Actions
**Learning:** Security-critical actions like copying backup codes often lack visual confirmation, leaving users uncertain if the action succeeded.
**Action:** Added toast notifications for successful copy actions in MFA settings to provide immediate, accessible feedback.
