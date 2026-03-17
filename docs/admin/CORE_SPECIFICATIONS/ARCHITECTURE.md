# ADMIN_ARCHITECTURE
**Version:** 1.0.0  
**Last Updated:** 2026-02-22
**Status:** Stub
**See Also:** [SOURCE_OF_TRUTH.md](../_agent/SOURCE_OF_TRUTH.md)

> **Note:** This document is a stub. For canonical architecture standards, see the [SOURCE_OF_TRUTH.md](../_agent/SOURCE_OF_TRUTH.md) and [ADMIN_PRD.md](./ADMIN_PRD.md).

---

## Overview

Admin is a Next.js App Router app at `admin.vantus.systems`.

### Core Architecture Decisions
- Server Actions for mutations
- Shared packages for db/security/rbac/audit/pricing/content
- No UI imports from client portal
- Versioned publishing and pricing rules

### Key Constraints
- MFA enforced for all admin users
- IP allowlist optional
- All actions audit-logged
- All destructive actions reversible
