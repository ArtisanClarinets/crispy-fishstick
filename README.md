# Thompson Studio - Premium Engineering Portfolio

> "High-trust systems. Premium UX. Production-grade engineering."

A flagship portfolio website designed to communicate rigor, craftsmanship, and enterprise-grade capability. Built with a modern, stable stack focusing on performance, accessibility, and visual polish.

## ⚡ Tech Stack

This project is built on a **proven, stable foundation** to ensure reliability and ease of maintenance:

-   **Framework:** [Next.js 14 (App Router)](https://nextjs.org/) - The React Framework for the Web.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - Strict mode for type safety.
-   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) - Utility-first CSS with a custom design token system.
-   **UI Library:** [shadcn/ui](https://ui.shadcn.com/) - Reusable components built with Radix UI and Tailwind.
-   **Animation:** [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library.
-   **Content:** [MDX](https://mdxjs.com/) - Markdown for the component era, powering Case Studies and Insights.
-   **Testing:**
    -   **Unit:** [Vitest](https://vitest.dev/) + React Testing Library.
    -   **E2E:** [Playwright](https://playwright.dev/).

## 🚀 Getting Started

We prioritize a seamless "one-command" setup experience.

### Prerequisites

-   Node.js 18+
-   npm

### Installation

Clone the repository and install dependencies. This will also automatically install the necessary Playwright browsers.

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Production Build

To simulate a production environment locally:

```bash
npm run build
npm start
```

## 🧪 Quality Gates & Testing

This project employs a rigorous testing strategy to ensure production readiness.

### End-to-End (E2E) Testing
We use Playwright to verify critical user flows (Navigation, Contact Form, Case Study rendering).

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui
```

### Unit Testing
Vitest is used for testing isolated UI logic and utilities.

```bash
npm test
```

### Static Analysis
Ensure code quality before committing:

```bash
# Linting (ESLint)
npm run lint

# Type Checking
npx tsc --noEmit
```

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
├── components/           # React components
│   ├── ui/               # Base UI components (Buttons, Inputs, etc.)
│   └── ...               # Feature-specific components
├── content/              # MDX Content Source
│   ├── work/             # Case Studies
│   └── insights/         # Blog Posts
├── lib/                  # Utilities and Configuration
│   ├── site.ts           # Global site config (Links, SEO, etc.)
│   └── mdx.ts            # MDX processing logic
├── public/               # Static assets
└── e2e/                  # Playwright E2E tests
```

## 📝 Managing Content

### Case Studies (`content/work/*.mdx`)
Add new case studies to the `content/work` directory.
**Frontmatter Requirements:**
```yaml
---
title: "Shopify Admin Sync"
description: "Enterprise sync engine handling 1M+ SKUs."
date: "2023-11-15"
tags: ["Backend", "GraphQL", "System Design"]
role: "Lead Engineer"
timeline: "4 months"
outcome: "99.99% sync reliability"
image: "/images/placeholder-work-1.jpg"
---
```

### Insights (`content/insights/*.mdx`)
Add thought leadership articles to `content/insights`.

## 🎨 Design System

The design system is token-driven via CSS variables in `app/globals.css`. It supports:
-   **Light/Dark Mode:** Automatic switching with perfect contrast ratios.
-   **Reduced Motion:** Respects user system preferences.
-   **Typography:** Apple-system font stack for native feel.

## 🛡️ Security

-   **Input Validation:** All MDX paths are sanitized to prevent traversal attacks.
-   **Strict TypeScript:** No `any` types allowed.

---

© 2024 Thompson Studio. All rights reserved.
