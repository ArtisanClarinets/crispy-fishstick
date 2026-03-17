# Vantus Systems — Client Portal (Portal-Only) SITE_MAP
**Document:** PORTAL_SITE_MAP  
**Version:** 2.1.0  
**Date:** 2026-02-25  
**Scope:** `apps/portal` only (authenticated + org-scoped) — `portal.vantus.systems`  
**Rule:** No timelines in this document. No admin or public routes in this document.

> **Monorepo context:** This document covers portal routes only. See `../../MASTER_DIRECTORY_TREE.md` for the full monorepo shape and `../DESIGN_UX/PORTAL_DIRECTORY_TREE.md` for the `apps/portal` codebase structure.

---

## 0) Route conventions

- All portal routes require authentication unless explicitly marked.
- All routes are **org-scoped** (tenant isolation): every request resolves an active `orgId`.
- **No deep-link surprises:** every detail route has a "parent" index route.
- **System pages** (errors/loading) exist per route group where appropriate.
- **PWA/Mobile ready:** all routes support responsive layouts and PWA installation.
- **AI-powered features:** indicated with 🤖 symbol where applicable.

---

## 1) Authentication and session routes (portal shell)

> These routes exist to enter/leave the portal safely.

- `/login`
- `/logout`
- `/reset-password`
- `/verify-email`
- `/mfa` (setup/challenge entry)
  - `/mfa/setup` (MFA enrollment)
  - `/mfa/backup-codes` (backup code management)
  - `/mfa/devices` (trusted device management)
- `/accept-invite` (invite token acceptance)
- `/select-org` (only if user belongs to >1 org)
- `/sessions` (manage active sessions/devices)
  - `/sessions/devices` (device management)
  - `/sessions/history` (login history)
- `/sso` (Single Sign-On entry points)
  - `/sso/callback` (SSO callback handler)
  - `/sso/error` (SSO error display)

---

## 2) Portal root and global shell

- `/portal` (root; redirects to dashboard or org selector)
- `/portal/dashboard` (default dashboard)
  - `/portal/dashboard/analytics` (analytics-focused view)
  - `/portal/dashboard/operations` (operations-focused view)
  - `/portal/dashboard/executive` (executive summary view)
  - `/portal/dashboard/custom/[id]` (user-defined custom dashboard)

Global shell elements (present across authenticated routes):
- Primary navigation (Dashboard, Work, Tickets, Docs, KB, Catalog, Billing)
- Secondary navigation (Approvals, Changes, Scorecards, Analytics, Assets, Users, Settings, Support)
- Global search 🤖 (optional) scoped to portal entities (tickets/docs/scorecards/kb/assets)
- Notification center (in-app + email preferences)
- Quick actions menu (create ticket, search, chat)
- "What changed" activity cue
- AI Assistant 🤖 (contextual help and suggestions)

---

## 3) Work (project transparency)

- `/portal/work` (workstream list + current status)
- `/portal/work/updates` (state-of-the-build updates feed)
- `/portal/work/updates/[id]` (update detail)
- `/portal/work/milestones` (milestone list)
- `/portal/work/milestones/[id]` (milestone detail)
  - `/portal/work/milestones/[id]/dependencies` (dependency visualization)
  - `/portal/work/milestones/[id]/timeline` (timeline/gantt view)
- `/portal/work/decisions` (ADR/decision log view)
- `/portal/work/decisions/[id]` (decision detail)
- `/portal/work/risks` (risk register view)
- `/portal/work/risks/[id]` (risk detail)
- `/portal/work/tasks` (task management view)
  - `/portal/work/tasks/board` (kanban board view)
  - `/portal/work/tasks/list` (list view)
  - `/portal/work/tasks/calendar` (calendar view)
  - `/portal/work/tasks/[id]` (task detail)
    - `/portal/work/tasks/[id]/subtasks` (subtask breakdown)
    - `/portal/work/tasks/[id]/time` (time tracking)
- `/portal/work/roadmap` (strategic roadmap view)
- `/portal/work/workflows` (workflow visualization 🤖)
  - `/portal/work/workflows/[id]` (specific workflow diagram)

---

## 4) Tickets (single operating channel)

- `/portal/tickets` (list; filters; saved views)
  - `/portal/tickets/saved-views` (manage saved views)
- `/portal/tickets/new` (create ticket)
  - `/portal/tickets/new/template/[templateId]` (create from template)
- `/portal/tickets/templates` (ticket templates management)
  - `/portal/tickets/templates/new` (create template)
  - `/portal/tickets/templates/[id]` (edit template)
- `/portal/tickets/[id]`
  - `/portal/tickets/[id]/activity` (audit/activity timeline)
  - `/portal/tickets/[id]/attachments` (attachments list)
  - `/portal/tickets/[id]/related` (linked docs/changes/approvals)
  - `/portal/tickets/[id]/time` (time tracking)
  - `/portal/tickets/[id]/sla` (SLA status and history)
  - `/portal/tickets/[id]/satisfaction` (satisfaction survey)
  - `/portal/tickets/[id]/merge` (merge with another ticket)
  - `/portal/tickets/[id]/split` (split into multiple tickets)
- `/portal/tickets/bulk` (bulk operations)
- `/portal/tickets/import` (import tickets)
- `/portal/tickets/export` (export tickets)

---

## 5) Docs Vault (ownership engine)

- `/portal/docs` (document library; filters; tags; collections)
- `/portal/docs/upload` (upload flow)
- `/portal/docs/[id]` (document detail)
  - `/portal/docs/[id]/versions` (version history)
  - `/portal/docs/[id]/acknowledgements` (receipts)
  - `/portal/docs/[id]/access` (access log for this doc)
  - `/portal/docs/[id]/comments` (document comments/discussions)
  - `/portal/docs/[id]/annotations` (document annotations)
- `/portal/docs/tags` (tag management for org)
- `/portal/docs/collections` (collections/folders)
- `/portal/docs/collections/[id]`
  - `/portal/docs/collections/[id]/permissions` (collection permissions)
- `/portal/docs/shared` (documents shared with me)
- `/portal/docs/recent` (recently accessed documents)
- `/portal/docs/starred` (starred/bookmarked documents)

---

## 6) Knowledge Base (self-service center)

- `/portal/kb` (knowledge base homepage)
  - `/portal/kb/featured` (featured articles)
  - `/portal/kb/trending` (trending content)
- `/portal/kb/search` (advanced search with AI 🤖)
  - `/portal/kb/search/results` (search results)
  - `/portal/kb/search/suggestions` (AI-powered suggestions 🤖)
- `/portal/kb/categories` (category browsing)
  - `/portal/kb/categories/[slug]` (category detail)
    - `/portal/kb/categories/[slug]/articles` (articles in category)
    - `/portal/kb/categories/[slug]/subcategories` (subcategories)
- `/portal/kb/articles/[slug]` (article detail)
  - `/portal/kb/articles/[slug]/print` (printer-friendly view)
  - `/portal/kb/articles/[slug]/share` (share article)
  - `/portal/kb/articles/[slug]/related` (related articles 🤖)
- `/portal/kb/feedback` (article feedback submission)
- `/portal/kb/community` (community forums)
  - `/portal/kb/community/forums` (forum list)
  - `/portal/kb/community/forums/[id]` (forum detail)
    - `/portal/kb/community/forums/[id]/topics` (topics in forum)
    - `/portal/kb/community/forums/[id]/new-topic` (create new topic)
  - `/portal/kb/community/topics/[id]` (topic detail)
    - `/portal/kb/community/topics/[id]/replies` (topic replies)
  - `/portal/kb/community/my-topics` (my forum activity)
  - `/portal/kb/community/following` (topics I'm following)
- `/portal/kb/faq` (FAQ section)
  - `/portal/kb/faq/categories` (FAQ categories)
  - `/portal/kb/faq/search` (FAQ search)
- `/portal/kb/guides` (guided tutorials)
  - `/portal/kb/guides/[id]` (tutorial detail)
  - `/portal/kb/guides/[id]/step/[stepNumber]` (specific tutorial step)
  - `/portal/kb/guides/progress` (my tutorial progress)
- `/portal/kb/glossary` (terminology glossary)
  - `/portal/kb/glossary/[term]` (term definition)
- `/portal/kb/videos` (video library)
  - `/portal/kb/videos/[id]` (video detail)
  - `/portal/kb/videos/playlists` (video playlists)
  - `/portal/kb/videos/playlists/[id]` (playlist detail)
- `/portal/kb/bookmarks` (my KB bookmarks)
- `/portal/kb/history` (my KB browsing history)

---

## 7) Service Catalog (service request center)

- `/portal/catalog` (service catalog homepage)
  - `/portal/catalog/featured` (featured services)
  - `/portal/catalog/popular` (most requested services)
  - `/portal/catalog/categories` (service categories)
  - `/portal/catalog/categories/[slug]` (services in category)
- `/portal/catalog/services/[id]` (service detail)
  - `/portal/catalog/services/[id]/requirements` (service requirements)
  - `/portal/catalog/services/[id]/pricing` (service pricing/tiers)
  - `/portal/catalog/services/[id]/sla` (service SLA details)
  - `/portal/catalog/services/[id]/faq` (service-specific FAQ)
  - `/portal/catalog/services/[id]/reviews` (service reviews)
- `/portal/catalog/compare` (service comparison tool)
  - `/portal/catalog/compare?services=id1,id2,id3` (specific comparison)
- `/portal/catalog/requests` (my service requests)
  - `/portal/catalog/requests/active` (active requests)
  - `/portal/catalog/requests/completed` (completed requests)
  - `/portal/catalog/requests/cancelled` (cancelled requests)
  - `/portal/catalog/requests/[id]` (request detail)
    - `/portal/catalog/requests/[id]/status` (request status tracking)
    - `/portal/catalog/requests/[id]/messages` (request messages)
    - `/portal/catalog/requests/[id]/documents` (request documents)
- `/portal/catalog/requests/new/[serviceId]` (new request form)
  - `/portal/catalog/requests/new/[serviceId]/draft` (saved drafts)
- `/portal/catalog/approvals` (pending service approvals)
  - `/portal/catalog/approvals/[id]` (approval detail)
  - `/portal/catalog/approvals/history` (approval history)
- `/portal/catalog/drafts` (my saved drafts)

---

## 8) Approvals (decision capture)

- `/portal/approvals` (approval queue)
  - `/portal/approvals/pending` (pending my approval)
  - `/portal/approvals/submitted` (my submitted approvals)
  - `/portal/approvals/delegated` (delegated approvals)
  - `/portal/approvals/completed` (completed approvals history)
- `/portal/approvals/[id]` (approval detail)
  - `/portal/approvals/[id]/history` (approval history)
  - `/portal/approvals/[id]/attachments` (supporting files)
  - `/portal/approvals/[id]/comments` (approval discussion)
  - `/portal/approvals/[id]/escalate` (escalation options)
- `/portal/approvals/delegates` (approval delegation management)

---

## 9) Changes (change control)

- `/portal/changes` (change request list)
  - `/portal/changes/calendar` (change calendar view)
  - `/portal/changes/timeline` (timeline view)
- `/portal/changes/new` (create change request)
  - `/portal/changes/new/template/[templateId]` (create from template)
- `/portal/changes/[id]` (change request detail)
  - `/portal/changes/[id]/estimate` (impact: time/cost/maintenance)
  - `/portal/changes/[id]/approvals` (linked approvals)
  - `/portal/changes/[id]/history` (state transitions)
  - `/portal/changes/[id]/implementation` (implementation plan)
  - `/portal/changes/[id]/rollback` (rollback plan)
  - `/portal/changes/[id]/communication` (change communication)
- `/portal/changes/templates` (change request templates)
- `/portal/changes/schedule` (change schedule board)

---

## 10) Scorecards (proof artifacts)

- `/portal/scorecards` (scorecard list)
  - `/portal/scorecards/active` (active scorecards)
  - `/portal/scorecards/archived` (archived scorecards)
- `/portal/scorecards/[id]` (scorecard detail)
  - `/portal/scorecards/[id]/metrics` (metric detail views)
  - `/portal/scorecards/[id]/evidence` (evidence mappings)
  - `/portal/scorecards/[id]/exports` (export jobs + downloads)
  - `/portal/scorecards/[id]/history` (scorecard history)
  - `/portal/scorecards/[id]/trends` (metric trends over time)
- `/portal/scorecards/compare` (compare multiple scorecards)

---

## 11) Evidence exports (integrity-first downloads)

- `/portal/exports` (export jobs list)
  - `/portal/exports/scheduled` (scheduled exports)
  - `/portal/exports/templates` (export templates)
- `/portal/exports/new` (create export job)
  - `/portal/exports/new/custom` (custom export builder)
- `/portal/exports/[id]` (job detail; status; manifest)
  - `/portal/exports/[id]/download` (download endpoint)
  - `/portal/exports/[id]/manifest` (hash list, checksums, file inventory)
  - `/portal/exports/[id]/audit` (export audit trail)
- `/portal/exports/settings` (export preferences)

---

## 12) Billing (clarity + receipts)

- `/portal/billing` (subscription overview)
- `/portal/billing/invoices` (invoice list)
  - `/portal/billing/invoices/[id]` (invoice detail)
    - `/portal/billing/invoices/[id]/pdf` (invoice PDF)
    - `/portal/billing/invoices/[id]/items` (line item details)
- `/portal/billing/payment-methods` (payment methods)
  - `/portal/billing/payment-methods/new` (add payment method)
  - `/portal/billing/payment-methods/[id]` (manage payment method)
- `/portal/billing/plan` (plan details, entitlements)
  - `/portal/billing/plan/usage` (current usage)
  - `/portal/billing/plan/limits` (plan limits)
  - `/portal/billing/plan/upgrade` (upgrade options)
  - `/portal/billing/plan/downgrade` (downgrade options)
- `/portal/billing/history` (billing activity timeline)
- `/portal/billing/statements` (account statements)
- `/portal/billing/credits` (credits and adjustments)
- `/portal/billing/contacts` (billing contacts)

---

## 13) Analytics & Reports (data insights)

- `/portal/analytics` (analytics dashboard)
  - `/portal/analytics/overview` (high-level overview)
  - `/portal/analytics/real-time` (real-time metrics)
- `/portal/analytics/reports` (report library)
  - `/portal/analytics/reports/saved` (my saved reports)
  - `/portal/analytics/reports/shared` (reports shared with me)
  - `/portal/analytics/reports/[id]` (report detail)
    - `/portal/analytics/reports/[id]/run` (run report)
    - `/portal/analytics/reports/[id]/schedule` (schedule report)
    - `/portal/analytics/reports/[id]/share` (share report)
    - `/portal/analytics/reports/[id]/export` (export report)
- `/portal/analytics/reports/custom` (custom report builder 🤖)
  - `/portal/analytics/reports/custom/new` (create custom report)
  - `/portal/analytics/reports/custom/[id]/edit` (edit custom report)
- `/portal/analytics/insights` (AI-powered insights 🤖)
  - `/portal/analytics/insights/trends` (trend analysis)
  - `/portal/analytics/insights/anomalies` (anomaly detection)
  - `/portal/analytics/insights/predictions` (predictive analytics 🤖)
  - `/portal/analytics/insights/recommendations` (action recommendations 🤖)
- `/portal/analytics/sla` (SLA performance)
  - `/portal/analytics/sla/overview` (SLA overview)
  - `/portal/analytics/sla/breach` (breach analysis)
  - `/portal/analytics/sla/trends` (SLA trend analysis)
- `/portal/analytics/satisfaction` (satisfaction metrics)
  - `/portal/analytics/satisfaction/csAT` (CSAT scores)
  - `/portal/analytics/satisfaction/nps` (NPS scores)
  - `/portal/analytics/satisfaction/feedback` (feedback analysis 🤖)
- `/portal/analytics/operations` (operational metrics)
- `/portal/analytics/financial` (financial analytics)
- `/portal/analytics/custom` (custom analytics dashboards)
  - `/portal/analytics/custom/[id]` (specific custom dashboard)

---

## 14) Asset Management (resource inventory)

- `/portal/assets` (asset inventory)
  - `/portal/assets/list` (list view)
  - `/portal/assets/map` (map/visual view)
  - `/portal/assets/tree` (hierarchical tree view)
  - `/portal/assets/search` (advanced asset search)
- `/portal/assets/[id]` (asset detail)
  - `/portal/assets/[id]/overview` (asset overview)
  - `/portal/assets/[id]/specs` (technical specifications)
  - `/portal/assets/[id]/history` (asset history/changelog)
  - `/portal/assets/[id]/documents` (asset documentation)
  - `/portal/assets/[id]/tickets` (related tickets)
  - `/portal/assets/[id]/contracts` (asset contracts/warranties)
  - `/portal/assets/[id]/costs` (cost tracking)
- `/portal/assets/relationships` (relationship maps)
  - `/portal/assets/relationships/graph` (graph visualization)
  - `/portal/assets/relationships/dependencies` (dependency view)
  - `/portal/assets/relationships/impact` (impact analysis)
- `/portal/assets/maintenance` (maintenance schedules)
  - `/portal/assets/maintenance/calendar` (maintenance calendar)
  - `/portal/assets/maintenance/upcoming` (upcoming maintenance)
  - `/portal/assets/maintenance/history` (maintenance history)
  - `/portal/assets/maintenance/[id]` (specific maintenance record)
- `/portal/assets/discovery` (asset discovery scan results)
- `/portal/assets/import` (bulk asset import)
- `/portal/assets/export` (asset inventory export)

---

## 15) Communications (messaging center)

- `/portal/messages` (in-app messaging center)
  - `/portal/messages/inbox` (message inbox)
  - `/portal/messages/sent` (sent messages)
  - `/portal/messages/drafts` (draft messages)
  - `/portal/messages/archived` (archived messages)
  - `/portal/messages/[id]` (message thread detail)
    - `/portal/messages/[id]/attachments` (message attachments)
- `/portal/messages/chat` (real-time chat)
  - `/portal/messages/chat/rooms` (chat rooms)
  - `/portal/messages/chat/rooms/[id]` (specific chat room)
  - `/portal/messages/chat/direct` (direct messages)
  - `/portal/messages/chat/direct/[userId]` (DM with specific user)
  - `/portal/messages/chat/history` (chat history search)
- `/portal/notifications` (notification center)
  - `/portal/notifications/all` (all notifications)
  - `/portal/notifications/unread` (unread notifications)
  - `/portal/notifications/mentions` (mentions)
  - `/portal/notifications/alerts` (critical alerts)
  - `/portal/notifications/preferences` (notification preferences)
- `/portal/announcements` (organization announcements)
  - `/portal/announcements/active` (active announcements)
  - `/portal/announcements/archive` (announcement archive)
  - `/portal/announcements/[id]` (announcement detail)
- `/portal/status` (service status page)
  - `/portal/status/current` (current status)
  - `/portal/status/history` (status history)
  - `/portal/status/incidents` (incident reports)
  - `/portal/status/incidents/[id]` (incident detail)
  - `/portal/status/subscribe` (status notifications subscription)
  - `/portal/status/api` (status API endpoints)

---

## 16) Collaboration (team coordination)

- `/portal/collaboration` (collaboration hub)
  - `/portal/collaboration/activity` (team activity feed)
  - `/portal/collaboration/team` (team overview)
- `/portal/collaboration/shared` (shared with me)
  - `/portal/collaboration/shared/tickets` (shared tickets)
  - `/portal/collaboration/shared/docs` (shared documents)
  - `/portal/collaboration/shared/reports` (shared reports)
  - `/portal/collaboration/shared/dashboards` (shared dashboards)
- `/portal/collaboration/following` (items I'm following)
  - `/portal/collaboration/following/tickets` (following tickets)
  - `/portal/collaboration/following/projects` (following projects)
  - `/portal/collaboration/following/docs` (following documents)
  - `/portal/collaboration/following/discussions` (following discussions)
- `/portal/collaboration/mentions` (my mentions)
  - `/portal/collaboration/mentions/unread` (unread mentions)
  - `/portal/collaboration/mentions/history` (mention history)
- `/portal/collaboration/sharing` (items I've shared)
- `/portal/collaboration/requests` (collaboration requests)
  - `/portal/collaboration/requests/pending` (pending requests)
  - `/portal/collaboration/requests/sent` (requests I've sent)
- `/portal/collaboration/watchlist` (custom watchlist management)

---

## 17) Compliance & Governance (policy center)

- `/portal/compliance` (compliance dashboard)
  - `/portal/compliance/overview` (compliance overview)
  - `/portal/compliance/frameworks` (compliance frameworks)
  - `/portal/compliance/scorecards` (compliance scorecards)
- `/portal/compliance/policies` (policy center)
  - `/portal/compliance/policies/active` (active policies)
  - `/portal/compliance/policies/categories` (policy categories)
  - `/portal/compliance/policies/[id]` (policy detail)
    - `/portal/compliance/policies/[id]/versions` (policy versions)
    - `/portal/compliance/policies/[id]/history` (policy history)
- `/portal/compliance/acknowledgments` (my acknowledgments)
  - `/portal/compliance/acknowledgments/pending` (pending acknowledgments)
  - `/portal/compliance/acknowledgments/completed` (completed acknowledgments)
  - `/portal/compliance/acknowledgments/history` (acknowledgment history)
- `/portal/compliance/audits` (audit trail access)
  - `/portal/compliance/audits/reports` (audit reports)
  - `/portal/compliance/audits/[id]` (specific audit detail)
  - `/portal/compliance/audits/findings` (audit findings)
  - `/portal/compliance/audits/remediation` (remediation tracking)
- `/portal/compliance/privacy` (privacy controls)
  - `/portal/compliance/privacy/settings` (privacy settings)
  - `/portal/compliance/privacy/data` (my data overview)
  - `/portal/compliance/privacy/export` (export my data)
  - `/portal/compliance/privacy/delete` (data deletion requests)
  - `/portal/compliance/privacy/consent` (consent management)
- `/portal/compliance/certifications` (certification tracking)
- `/portal/compliance/risk` (compliance risk assessment)

---

## 18) Personalization (my portal)

- `/portal/me` (my profile hub)
  - `/portal/me/profile` (profile overview)
  - `/portal/me/settings` (personal settings)
- `/portal/me/dashboard` (my custom dashboard)
  - `/portal/me/dashboard/widgets` (widget management)
  - `/portal/me/dashboard/layout` (dashboard layout editor)
  - `/portal/me/dashboard/create` (create new dashboard)
  - `/portal/me/dashboard/[id]/edit` (edit specific dashboard)
- `/portal/me/preferences` (personal preferences)
  - `/portal/me/preferences/theme` (theme settings)
  - `/portal/me/preferences/language` (language settings)
  - `/portal/me/preferences/timezone` (timezone settings)
  - `/portal/me/preferences/notifications` (notification preferences)
  - `/portal/me/preferences/accessibility` (accessibility settings)
  - `/portal/me/preferences/privacy` (privacy preferences)
- `/portal/me/achievements` (gamification/achievements)
  - `/portal/me/achievements/badges` (my badges)
  - `/portal/me/achievements/levels` (my level/progress)
  - `/portal/me/achievements/leaderboard` (leaderboards)
  - `/portal/me/achievements/challenges` (active challenges)
  - `/portal/me/achievements/history` (achievement history)
- `/portal/me/saved` (saved items/bookmarks)
  - `/portal/me/saved/tickets` (saved tickets)
  - `/portal/me/saved/docs` (saved documents)
  - `/portal/me/saved/articles` (saved KB articles)
  - `/portal/me/saved/searches` (saved searches)
  - `/portal/me/saved/reports` (saved reports)
- `/portal/me/activity` (my activity history)
  - `/portal/me/activity/log` (activity log)
  - `/portal/me/activity/timeline` (personal timeline)
- `/portal/me/shortcuts` (my keyboard shortcuts)
- `/portal/me/apps` (connected apps/integrations)

---

## 19) Users and org administration

- `/portal/users` (members list)
  - `/portal/users/directory` (user directory)
  - `/portal/users/teams` (team management)
  - `/portal/users/teams/[id]` (team detail)
- `/portal/users/invite` (invite flow)
  - `/portal/users/invite/bulk` (bulk invite)
- `/portal/users/[id]` (member detail; role; access)
  - `/portal/users/[id]/profile` (user profile)
  - `/portal/users/[id]/activity` (user activity)
  - `/portal/users/[id]/permissions` (user permissions)
- `/portal/roles` (role catalog view; if client-manageable)
  - `/portal/roles/[id]` (role detail)
  - `/portal/roles/[id]/permissions` (role permissions)
  - `/portal/roles/[id]/members` (role members)
- `/portal/groups` (user groups)
  - `/portal/groups/[id]` (group detail)
  - `/portal/groups/[id]/members` (group members)

---

## 20) Org-level settings

- `/portal/settings` (settings hub)
  - `/portal/settings/overview` (settings overview)
- `/portal/settings/profile` (user profile)
- `/portal/settings/security` (MFA, sessions, recovery)
  - `/portal/settings/security/password` (password settings)
  - `/portal/settings/security/mfa` (MFA settings)
  - `/portal/settings/security/sessions` (active sessions)
  - `/portal/settings/security/devices` (trusted devices)
  - `/portal/settings/security/api-keys` (API key management)
- `/portal/settings/notifications` (email/in-app preferences)
  - `/portal/settings/notifications/email` (email preferences)
  - `/portal/settings/notifications/in-app` (in-app preferences)
  - `/portal/settings/notifications/mobile` (mobile push preferences)
- `/portal/settings/data` (exports, retention, portability)
  - `/portal/settings/data/export` (data export)
  - `/portal/settings/data/import` (data import)
  - `/portal/settings/data/retention` (data retention)

---

## 21) Advanced Settings (organization configuration)

- `/portal/settings/organization` (org settings)
  - `/portal/settings/organization/profile` (org profile)
  - `/portal/settings/organization/details` (org details)
  - `/portal/settings/organization/branding` (branding settings)
  - `/portal/settings/organization/domains` (custom domains)
  - `/portal/settings/organization/locations` (office locations)
- `/portal/settings/branding` (branding customization)
  - `/portal/settings/branding/logo` (logo management)
  - `/portal/settings/branding/colors` (color scheme)
  - `/portal/settings/branding/themes` (theme builder)
  - `/portal/settings/branding/email` (email templates)
  - `/portal/settings/branding/portal` (portal customization)
- `/portal/settings/workflows` (workflow configuration)
  - `/portal/settings/workflows/list` (workflow list)
  - `/portal/settings/workflows/[id]` (workflow detail)
  - `/portal/settings/workflows/[id]/builder` (workflow builder)
  - `/portal/settings/workflows/[id]/history` (workflow history)
  - `/portal/settings/workflows/templates` (workflow templates)
- `/portal/settings/slas` (SLA configuration)
  - `/portal/settings/slas/list` (SLA list)
  - `/portal/settings/slas/[id]` (SLA detail)
  - `/portal/settings/slas/[id]/metrics` (SLA metrics)
  - `/portal/settings/slas/calendars` (business hours calendars)
  - `/portal/settings/slas/holidays` (holiday schedules)
- `/portal/settings/fields` (custom fields)
  - `/portal/settings/fields/tickets` (ticket custom fields)
  - `/portal/settings/fields/assets` (asset custom fields)
  - `/portal/settings/fields/users` (user custom fields)
  - `/portal/settings/fields/organizations` (org custom fields)
- `/portal/settings/templates` (templates management)
  - `/portal/settings/templates/tickets` (ticket templates)
  - `/portal/settings/templates/emails` (email templates)
  - `/portal/settings/templates/reports` (report templates)
  - `/portal/settings/templates/workflows` (workflow templates)
  - `/portal/settings/templates/surveys` (survey templates)
- `/portal/settings/integrations` (integration settings)
  - `/portal/settings/integrations/catalog` (integration catalog)
  - `/portal/settings/integrations/connected` (connected integrations)
  - `/portal/settings/integrations/[id]` (integration detail)
  - `/portal/settings/integrations/api` (API settings)
  - `/portal/settings/integrations/webhooks` (webhook management)
  - `/portal/settings/integrations/oauth` (OAuth applications)
- `/portal/settings/automation` (automation rules)
  - `/portal/settings/automation/rules` (automation rules)
  - `/portal/settings/automation/triggers` (trigger configuration)
  - `/portal/settings/automation/actions` (action library)
- `/portal/settings/access` (access control)
  - `/portal/settings/access/policies` (access policies)
  - `/portal/settings/access/sso` (SSO configuration)
  - `/portal/settings/access/ldap` (LDAP/AD settings)
  - `/portal/settings/access/ip` (IP restrictions)
- `/portal/settings/audit` (audit configuration)
  - `/portal/settings/audit/logs` (audit log settings)
  - `/portal/settings/audit/retention` (audit retention)

---

## 22) Support & help

- `/portal/support` (help hub)
  - `/portal/support/home` (support homepage)
  - `/portal/support/search` (help search 🤖)
- `/portal/support/contact` (support contact options; SLA clarity)
  - `/portal/support/contact/form` (contact form)
  - `/portal/support/contact/schedule` (schedule call)
  - `/portal/support/contact/chat` (live chat)
- `/portal/support/status` (status mirror; safe subset)
- `/portal/support/faq` (portal FAQ)
  - `/portal/support/faq/categories` (FAQ categories)
- `/portal/support/tutorials` (interactive tutorials)
  - `/portal/support/tutorials/getting-started` (getting started guide)
  - `/portal/support/tutorials/features` (feature tutorials)
  - `/portal/support/tutorials/advanced` (advanced tutorials)
  - `/portal/support/tutorials/[id]` (specific tutorial)
- `/portal/support/shortcuts` (keyboard shortcuts)
  - `/portal/support/shortcuts/global` (global shortcuts)
  - `/portal/support/shortcuts/context` (contextual shortcuts)
- `/portal/support/feedback` (give feedback)
  - `/portal/support/feedback/feature` (feature request)
  - `/portal/support/feedback/bug` (bug report)
  - `/portal/support/feedback/general` (general feedback)
- `/portal/support/roadmap` (feature roadmap)
  - `/portal/support/roadmap/upcoming` (upcoming features)
  - `/portal/support/roadmap/ideas` (community ideas)
  - `/portal/support/roadmap/voting` (feature voting)
- `/portal/support/releases` (release notes)
  - `/portal/support/releases/[version]` (specific release notes)
- `/portal/support/diagnostics` (diagnostic tools)
- `/portal/support/accessibility` (accessibility help)

---

## 23) System/utility (portal-only)

- `/portal/search` (portal-scoped search 🤖)
  - `/portal/search/results` (search results)
  - `/portal/search/advanced` (advanced search)
  - `/portal/search/filters` (search filters)
  - `/portal/search/saved` (saved searches)
- `/portal/activity` (org activity log; safe view)
  - `/portal/activity/feed` (activity feed)
  - `/portal/activity/timeline` (activity timeline)
- `/portal/audit-log` (if client-visible; filtered & safe)
  - `/portal/audit-log/entries` (audit entries)
  - `/portal/audit-log/export` (export audit log)
- `/portal/import` (data import utility)
- `/portal/export` (data export utility)
- `/portal/shortcuts` (keyboard shortcuts reference)
- `/portal/mobile` (mobile app links)
- `/portal/pwa` (PWA installation)

---

## 24) Error UX (portal-only)

- `/portal/not-found` (404)
- `/portal/error` (error boundary)
- `/portal/loading` (route-level loading)
- `/portal/unauthorized` (403 access denied)
- `/portal/maintenance` (maintenance mode)
- `/portal/session-expired` (session timeout)

---

## Appendix A — Access control notes (route-level)

### Global Roles
- **Org Owner:** full access to billing, exports, user management, all settings, compliance, advanced configuration
- **Org Admin:** full access except billing ownership changes; can manage users, settings, workflows
- **Approver:** approvals + changes read; can approve; limited billing view
- **Billing Admin:** billing routes + invoices + payment methods; cannot modify org structure
- **Member:** tickets + docs + KB + catalog requests + assets (assigned) + collaboration + personalization
- **Viewer:** read-only for allowed sections; cannot create or modify

### Section-Specific Permissions

| Section | Owner | Admin | Approver | Billing | Member | Viewer |
|---------|-------|-------|----------|---------|--------|--------|
| **Authentication** | Self | Self | Self | Self | Self | Self |
| **Dashboard** | All views | All views | Standard | Standard | Standard | Standard |
| **Work** | Full | Full | Read | Read | Read | Read |
| **Tickets** | Full | Full | Full | Full | Full | Read |
| **Docs Vault** | Full | Full | Read | Read | Per doc | Per doc |
| **Knowledge Base** | Manage | Manage | Read | Read | Read + Community | Read |
| **Service Catalog** | Manage | Manage | Approve | Request | Request + View | View |
| **Approvals** | Full | Full | Full | Limited | Own items | Read |
| **Changes** | Full | Full | Read | Read | Read | Read |
| **Scorecards** | Full | Full | Read | Read | Read | Read |
| **Exports** | Full | Full | Limited | Limited | Own exports | None |
| **Billing** | Full | View | View | Full | None | None |
| **Analytics** | Full | Full | Department | Department | Self | None |
| **Assets** | Full | Full | Read | Read | Assigned | None |
| **Communications** | Manage | Manage | Full | Full | Full | Read |
| **Collaboration** | Full | Full | Full | Full | Full | Limited |
| **Compliance** | Full | Full | Acknowledge | Acknowledge | Acknowledge | Acknowledge |
| **Personalization** | Self | Self | Self | Self | Self | Self |
| **Users** | Full | Full | View | View | View own | None |
| **Settings** | Full | Limited | None | None | Self | None |
| **Advanced Settings** | Full | Limited | None | None | None | None |
| **Support** | Full | Full | Full | Full | Full | Full |

### Knowledge Base Roles
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
- **KB Viewer:** Can read articles and participate in community
- **Community Moderator:** Can moderate forums; delete inappropriate content

### Service Catalog Roles
- **Catalog Admin:** Can manage services, categories, pricing, SLAs
- **Service Owner:** Can manage specific services they own
- **Approver:** Can approve service requests
- **Requester:** Can browse catalog and submit requests

### Analytics & Reports Roles
- **Analytics Admin:** Full access to all reports, custom builder, insights
- **Department Manager:** Access to department-level data and reports
- **Standard User:** Access to self-data and public reports
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

### Asset Management Roles
- **Asset Manager:** Full CRUD on assets, maintenance scheduling, relationship management
- **Asset Custodian:** Can update assigned assets, view related
- **Standard User:** View own assigned assets only
- **Viewer:** Read-only access to asset inventory

### Communications Roles
- **Communications Admin:** Can send announcements, manage status page
- **Standard User:** Full messaging, chat, notification management
- **Viewer:** Read-only access to announcements

### Collaboration Roles
- **Standard User:** Full collaboration features (share, follow, mention)
- **Viewer:** Can view shared items, limited interaction

### Compliance & Governance Roles
- **Compliance Officer:** Full access to policies, audits, risk assessment
- **Standard User:** Can view policies, submit acknowledgments, manage privacy settings
- **All Users:** Required to acknowledge applicable policies

### Gamification Permissions
- All users can view own achievements
- Leaderboards may be public or restricted based on org settings
- Challenge participation is self-service

---

## Appendix B — Route Conventions Summary

### URL Patterns
- **List/Index:** `/portal/[section]`
- **Detail:** `/portal/[section]/[id]`
- **Create:** `/portal/[section]/new`
- **Edit:** `/portal/[section]/[id]/edit`
- **Sub-resources:** `/portal/[section]/[id]/[subresource]`
- **Actions:** `/portal/[section]/[id]/[action]` (e.g., `/merge`, `/export`)
- **Search:** `/portal/[section]/search`
- **Templates:** `/portal/[section]/templates`
- **Settings:** `/portal/settings/[section]`

### Dynamic Parameters
- `[id]` - Numeric or UUID identifier
- `[slug]` - URL-friendly string identifier (articles, categories)
- `[userId]` - User identifier
- `[templateId]` - Template identifier
- `[stepNumber]` - Sequential number for guided flows

### Query Parameters (common)
- `?filter=` - Filter criteria
- `?sort=` - Sort order
- `?view=` - View mode (list, grid, calendar, etc.)
- `?dateFrom=` / `?dateTo=` - Date range
- `?search=` - Search term
- `?page=` - Pagination

---

## Appendix C — AI-Powered Features Reference (🤖)

The following routes include or are enhanced by AI capabilities:

1. **Global Search** (`/portal/search`) - AI-powered relevance ranking
2. **KB Search** (`/portal/kb/search`) - Semantic search, auto-suggestions
3. **Analytics Insights** (`/portal/analytics/insights`) - Anomaly detection, predictions
4. **Custom Reports** (`/portal/analytics/reports/custom`) - Natural language report builder
5. **Workflow Visualization** (`/portal/work/workflows`) - AI-optimized workflow suggestions
6. **Ticket Suggestions** - Auto-categorization, routing suggestions
7. **Help Support** (`/portal/support/search`) - AI help assistant
8. **Satisfaction Analysis** (`/portal/analytics/satisfaction`) - Sentiment analysis
9. **Related Content** (`/portal/kb/articles/[slug]/related`) - Content recommendations
10. **Predictive Analytics** (`/portal/analytics/insights/predictions`) - Trend forecasting

---

*End of Document*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
- v2.1.0 (2026-02-25): Fixed typo `/portalActivity/timeline` → `/portal/activity/timeline`. Added monorepo context note and scope rule header. Updated version and date.
