# PORTAL_RBAC_MATRIX — Route + Action Permissions
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only

---

## 0) Roles
- Org Owner
- Approver
- Billing
- Member
- Viewer
- Vantus Support (staff, limited, policy-controlled)

---

## 1) Route access (high level)

| Route Area | Org Owner | Approver | Billing | Member | Viewer |
|---|---:|---:|---:|---:|---:|
| /portal/dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| /portal/work/* | ✅ | ✅ | ✅ (read) | ✅ | ✅ (read) |
| /portal/tickets | ✅ | ✅ | ✅ (read) | ✅ | ✅ (read) |
| /portal/docs | ✅ | ✅ | ✅ (read) | ✅ | ✅ (read) |
| /portal/billing/* | ✅ | ✅ (limited) | ✅ | ❌ | ❌ |
| /portal/users | ✅ | ❌ | ❌ | ❌ | ❌ |
| /portal/approvals/* (P2) | ✅ | ✅ | ❌ | ❌ | ❌ |
| /portal/changes/* (P2) | ✅ | ✅ | ❌ | ✅ (submit only) | ❌ |

---

## 2) Action permissions (examples)

| Action | Org Owner | Approver | Billing | Member | Viewer |
|---|---:|---:|---:|---:|---:|
| Invite user | ✅ | ❌ | ❌ | ❌ | ❌ |
| Change roles | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create ticket | ✅ | ✅ | ✅ | ✅ | ❌ |
| Upload attachment (ticket) | ✅ | ✅ | ✅ | ✅ | ❌ |
| Download doc | ✅ | ✅ | ✅ | ✅ | ✅ (read-only) |
| Export evidence bundle (P2) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Approve change (P2) | ✅ | ✅ | ❌ | ❌ | ❌ |

All enforcement is server-side; UI is only a convenience.

---

## 3) Audit requirements
Each sensitive action emits an AuditEvent with:
- actorType/actorId
- orgId
- action + target
- redacted metadata
- timestamp
