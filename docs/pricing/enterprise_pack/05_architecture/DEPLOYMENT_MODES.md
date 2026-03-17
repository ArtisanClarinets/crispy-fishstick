# Deployment Modes (When to choose what)
**Version:** 1.0
**Date:** 2026-03-05

## Mode A: Simple cloud (default)
**Use when:** marketing site + CMS, normal uptime needs.

**Pattern:** VPS + Docker + NGINX + backups.

## Mode B: Managed cloud services
**Use when:** uptime and compliance requirements are higher.

**Pattern:** managed Postgres, managed storage, CDN, monitoring.

## Mode C: Local/on-prem
**Use when:** the client needs local control or has connectivity constraints.

**Pattern:** client-owned hardware, hardened install, documented recovery.

## Mode D: Hybrid
**Use when:** local operations + cloud public site.

**Pattern:** public edge + local core services, VPN tunnel.

## Decision checklist
- What happens if internet goes down?
- What is the cost of downtime?
- Who maintains hardware?
- Does compliance require local control?
