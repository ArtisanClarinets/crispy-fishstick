# Environment Manifest (Public-safe)

Version: 2.0
Last updated: 2026-03-06
Scope: public-safe guidance for `apps/public` runtime configuration

## Purpose

Define non-sensitive environment variable categories for public site implementation without exposing secret inventories.

## Public-safe categories

- Site identity and canonical URL settings.
- Feature flags used by public routes.
- Analytics toggle flags and non-sensitive client config.
- Build/runtime mode configuration.

## Security rules

- Do not document secret names or values in public docs.
- Keep secret storage and rotation details in internal operations docs only.
- Only browser-safe variables may be surfaced to client bundles.

## Internal reference

Use internal operations/security documents for complete secret and infrastructure manifests.
