## 2025-02-18 - Hardcoded Auth Secret Fallback
**Vulnerability:** A hardcoded string ("dev-secret-fallback...") was used as a fallback when `NEXTAUTH_SECRET` was missing in non-production environments.
**Learning:** Hardcoded fallbacks, even for development, create a risk of accidental exposure if an environment is misconfigured (e.g. staging). It also teaches developers that secrets aren't strictly required.
**Prevention:** Use `crypto.randomBytes` or `crypto.getRandomValues` to generate a temporary secret for development sessions, or throw an error to enforce configuration. Secure by default.
