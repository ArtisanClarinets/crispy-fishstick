# Studio Portfolio

A premium, Apple-caliber portfolio website built with Next.js 14, React 18, Tailwind CSS, and TypeScript. Designed for high-end freelance engineering studios.

## Features

-   **Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion.
-   **Design System:** Token-driven Tailwind setup with shadcn/ui components.
-   **Performance:** Optimized for Core Web Vitals (Lighthouse 95+ targets).
-   **Content:** MDX-driven case studies and insights.
-   **Accessibility:** Fully accessible (WCAG AA compliant).
-   **Testing:** End-to-end testing with Playwright, unit testing with Vitest.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3.  **Build for production:**

    ```bash
    npm run build
    npm start
    ```

## Adding Content

### Case Studies
Add new case studies in `content/work/`. Use the existing `.mdx` files as templates. Ensure you include the frontmatter:

```yaml
---
title: "Project Name"
excerpt: "Short description"
date: "2024-01-01"
client: "Client Name"
role: "Engineering Lead"
tags: ["Next.js", "TypeScript"]
coverImage: "/images/project-cover.jpg"
---
```

### Insights (Blog)
Add new posts in `content/insights/`.

## Configuration

Edit `lib/site.ts` to update global site information (Company Name, Links, etc.).

## Quality Gates

This project enforces strict quality standards:

-   **Linting:** `npm run lint`
-   **Type Checking:** Built into build process.
-   **E2E Tests:** `npm run test:e2e`

## License

Private / Proprietary.
