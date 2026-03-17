# VSP Data Model (Baseline)
**Version:** 1.0
**Date:** 2026-03-05

## Entities

### Client
- id
- name
- primary_contact
- industry
- website_url_current
- notes

### Lead
- id
- client_id
- stage (new, contacted, call_booked, proposal_sent, won, lost)
- source (outbound, referral, inbound)
- next_action
- next_action_due

### Project
- id
- client_id
- package_type (website, website_cms, portal)
- status (discovery, content, build, qa, deploy, handoff)
- start_date / target_launch

### Deliverable
- id
- project_id
- type (content, seo, a11y, performance, security, handoff)
- status
- evidence_link

### Page
- id
- project_id
- slug
- status (draft, in_review, approved, published)

### Environment
- id
- project_id
- type (dev, stage, prod)
- hosting_mode (cloud, local, hybrid)
- url
- health_status

### ChangeRequest
- id
- project_id
- requested_by
- description
- impact_time
- impact_cost
- status (submitted, estimating, approved, rejected, in_progress, shipped)

### ProofArtifact
- id
- project_id
- category (lighthouse, a11y, security_headers)
- before_url
- after_url
- report_link
- captured_at
