# Public Incident Response (Public-safe)

Version: 2.0
Last updated: 2026-03-06
Scope: public incident handling summary for `apps/public`

## Severity model

- SEV1: full outage, confirmed security event, or material public impact
- SEV2: major route degradation with conversion or trust impact
- SEV3: partial degradation with workaround
- SEV4: minor issue

## Response lifecycle

1. Detect and triage impact scope.
2. Contain by disabling affected path or rolling back release.
3. Recover and verify core route health.
4. Communicate status updates in plain language.
5. Complete post-incident review and preventive actions.

## Public communication rules

- Publish impact and current status without exploit details.
- Share expected next update time for active incidents.
- Publish closure note when service is stable.

## Triggered playbooks

- Public form abuse spike
- Public route outage
- Pricing page data integrity mismatch
- Suspected security incident with public impact

## Internal references

Use internal incident and security runbooks for privileged forensics, secret rotation, and detailed remediation steps.
