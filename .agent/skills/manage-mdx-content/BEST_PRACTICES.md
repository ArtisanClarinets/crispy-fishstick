# Best Practices for Managing MDX Content

This guide outlines proven patterns and anti-patterns for authoring and managing MDX content in Project SENTINEL, ensuring technical accuracy, SEO optimization, and visual consistency.

## 1. Frontmatter Management

### ✓ DO: Provide Comprehensive Metadata

```yaml
# CORRECT: Fully populated frontmatter
title: "Scaling PostgreSQL for Multi-Tenant SaaS"
description: "Architectural patterns for handling 10x growth."
date: "2026-01-13"
tags: ["Database", "System Design", "SaaS"]
readTime: "12 min"
image: "/images/insights/postgres-scaling.jpg"
kpis:
  - label: "Query Throughput"
    before: "5k req/s"
    after: "50k req/s"
    delta: "+900%"
```

**Why this matters:**
- **SEO**: `description` and `image` are used for meta tags and social previews.
- **UX**: `readTime` and `tags` help users navigate and filter content.
- **Data Visualization**: `kpis` are used to generate structured data and visual metrics.

### ✗ DON'T: Skip Required Fields

Missing `title`, `description`, or `date` will cause the MDX pipeline to fail during build, preventing the content from being published.

## 2. Content Structure

### ✓ DO: Use Semantic Headings

Structure your content using logical heading levels (`#`, `##`, `###`) to ensure a clear hierarchy and support automatic Table of Contents (ToC) generation.

### ✗ DON'T: Use Headings for Styling

Do not use `#` or `##` just to make text larger. Use them to define the structure of your narrative.

## 3. Technical Accuracy & Evidence

### ✓ DO: Use Data-Driven Narratives

Support your engineering claims with hard metrics using the `<Metric />` component.

```mdx
// CORRECT: Evidence-based claim
We observed a significant improvement in P99 latency after implementing the new caching layer.

<Metric label="P99 Latency" before="450ms" after="85ms" delta="-81%" />
```

### ✗ DON'T: Make Vague Claims

Avoid phrases like "much faster" or "highly scalable" without providing specific data or architectural evidence.

## 4. Asset Management

### ✓ DO: Use Optimized Images

*   **Format**: Use WebP or AVIF for better compression.
*   **Location**: Always place assets in `public/images/work/` or `public/images/insights/`.
*   **Alt Text**: Provide descriptive alt text for all images to ensure accessibility.

```mdx
// CORRECT: Referencing an image with alt text
![System Architecture Diagram](/images/work/architecture-v2.png "High-level overview of the trading engine")
```

### ✗ DON'T: Use External Image Links

External links can break or slow down page loads. Always host assets locally within the repository.

## 5. Error Handling in MDX

### ✓ DO: Validate MDX Syntax Locally

Run the development server (`npm run dev`) and navigate to the content page to ensure there are no parsing errors or broken component references.

### ✗ DON'T: Ignore Build Warnings

MDX warnings often indicate missing components or invalid frontmatter that could lead to broken pages in production.

## 6. Integration with Workflows

### ✓ DO: Track Content Updates

When creating or updating content, use the internal task management tools to track progress and ensure all review steps are completed.

```bash
# Example: Tracking content creation
# updateTodoList({ todos: "[x] MDX Draft Completed\n[-] Reviewing Technical Accuracy\n[ ] Finalizing SEO Metadata" })
```

## Summary: MDX Content Checklist

**Every MDX file must verify:**

- [ ] **Frontmatter**: All required fields are present and valid.
- [ ] **KPIs**: Metrics are accurately reflected in the frontmatter and text.
- [ ] **Components**: All custom MDX components are correctly imported and used.
- [ ] **Assets**: Images are hosted locally and have descriptive alt text.
- [ ] **Redactions**: Sensitive information is properly documented and marked.
- [ ] **SEO**: Description and image are optimized for sharing.
- [ ] **Rendering**: Page loads without errors in the local environment.
