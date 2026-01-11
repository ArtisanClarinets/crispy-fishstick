---
name: manage-mdx-content
description: How to author, structure, and manage MDX content for Work (case studies) and Insights (articles).
---

# Manage MDX Content

This skill defines the strict content authoring standards for Project SENTINEL.
Use this skill when creating or editing content in `content/work/*.mdx` or `content/insights/*.mdx`.

## 1. Content Types & Location

*   **Work (Case Studies)**: Located in `content/work/*.mdx`.
    *   **Purpose**: Deep-dive engineering narratives demonstrating system design, performance, and failure modes.
    *   **Tone**: Technical, evidence-based, "engineering mature".
*   **Insights (Articles)**: Located in `content/insights/*.mdx`.
    *   **Purpose**: Thought leadership, architectural patterns, and industry analysis.
    *   **Tone**: Professional, authoritative, educational.

## 2. Frontmatter Rules (Strict)

We use a custom MDX pipeline that enforces schema validation.

### Work (`content/work/*.mdx`)

**Required Fields:**
```yaml
title: "Project Name"
description: "One-sentence high-impact summary."
date: "YYYY-MM-DD"
```

**Strongly Recommended:**
```yaml
tags: ["Next.js", "PostgreSQL", "System Design"]
role: "Lead Engineer"
timeline: "3 months"
outcome: "50% latency reduction"
image: "/images/work/project-cover.jpg" # Public path
readTime: "8 min"
```

**Extended Fields (for rich case studies):**
```yaml
kpis:
  - label: "Latency"
    before: "800ms"
    after: "200ms"
    delta: "-75%"
    note: "P99 server response"
constraints:
  - "HIPAA Compliance"
  - "Zero downtime migration"
stack:
  - "React"
  - "Node.js"
riskRegister:
  - risk: "Data loss during migration"
    severity: "Critical"
    mitigation: "Dual-write strategy with rollback"
redactions:
  - label: "Client Name"
    reason: "NDA"
```

### Insights (`content/insights/*.mdx`)

**Required Fields:**
```yaml
title: "Article Title"
description: "Brief summary."
date: "YYYY-MM-DD"
```

**Recommended:**
```yaml
tags: ["Architecture", "Leadership"]
readTime: "5 min"
image: "/images/insights/cover.jpg"
toc: true # Enable/Disable Table of Contents
canonicalUrl: "https://external-platform.com/original-post"
```

## 3. Content Guidelines

### "Work" Structure (Case Modes)
The `/work/[slug]` page supports interactive "Case Modes". Structure your MDX to support these narratives:
1.  **Overview**: The problem and context.
2.  **Architecture**: System diagrams and technical decisions.
3.  **Failure Modes**: How it broke and how you fixed it (Incident Analysis).
4.  **Scale**: Handling load (10x traffic).
5.  **Results**: Hard metrics (refer to `kpis` in frontmatter).

### Redactions
*   Use the `redactions` frontmatter field to list what was removed.
*   In the text, clearly mark redacted info or generalize it (e.g., "A Series B Fintech" instead of "Company X").

### Assets
*   Place images in `public/images/work/` or `public/images/insights/`.
*   Reference them with absolute paths (e.g., `/images/work/diagram.png`).
