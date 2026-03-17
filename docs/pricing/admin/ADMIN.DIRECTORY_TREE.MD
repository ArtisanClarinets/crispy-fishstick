# Admin Directory Tree

**Version:** 1.0.0  
**Last Updated:** 2026-03-08  
**Status:** Active  
**Classification:** Internal

## Purpose

This document gives a high-level view of the intended admin application structure without pretending the full code tree already exists.

## Target Shape

- app shell for authentication, operator workflows, and restricted administration
- shared security and audit foundations
- delivery-control and pricing-governance tools
- content and media operations needed to support live client delivery

## Expected Top-Level Areas

- application routes and layouts
- operator-facing feature domains
- APIs and background jobs where needed
- security, audit, and observability support modules
- tests, scripts, and local docs for the admin surface

## Canonical References

- `README.md`
- `MASTER_INDEX.md`
- `CORE_SPECIFICATIONS/ADMIN_PRD.md`
- `CORE_SPECIFICATIONS/ADMIN_BUILD_NOW_VS_LATER.md`
- `SECURITY_COMPLIANCE/GOVERNANCE.md`

## Use Rule

Treat this file as a planning summary. If a future implementation needs an exact generated code tree, publish that from the live repository rather than maintaining a speculative exhaustive tree here.
