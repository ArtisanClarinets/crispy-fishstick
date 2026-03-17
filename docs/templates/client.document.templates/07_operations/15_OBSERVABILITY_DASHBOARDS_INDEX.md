---
Document: OBSERVABILITY_DASHBOARDS_INDEX
Doc ID: VS-TEMPLATE-OPS-015
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: DevOps Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-01-18
Confidentiality: Internal
Source of Truth: [docs/07_operations/15_OBSERVABILITY_DASHBOARDS_INDEX.md](docs/07_operations/15_OBSERVABILITY_DASHBOARDS_INDEX.md)
---

## Purpose
Catalog of all monitoring dashboards and what each visualization represents.

## Core Dashboards

### 1. [Global Health] (Link)
- **Primary Metric:** Error Rate (%) and Latency.
- **Use Case:** High-level executive overview of uptime.

### 2. [Database Internal] (Link)
- **Primary Metric:** Connection pool usage, Slow queries.
- **Use Case:** DB performance tuning and deadlock investigation.

### 3. [Auth & Security] (Link)
- **Primary Metric:** Login failures (401), Protected path hits.
- **Use Case:** Monitoring for credential stuffing or brute-force attempts.

### 4. [RUM - Real User Metrics] (Link)
- **Primary Metric:** Core Web Vitals (LCP, FID, CLS).
- **Use Case:** Validating real-world user experience across devices.
