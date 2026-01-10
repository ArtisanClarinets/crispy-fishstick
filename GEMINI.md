# Gemini Context File

This document provides context for AI assistants to understand and interact with the `crispy-fishstick` project.

## Project Overview

This is a Next.js 14 web application for Thompson Systems, a specialized engineering studio. It serves as a portfolio and showcase of their work and capabilities. The project is built with a "Server-First Architecture" using React Server Components, TypeScript, and Prisma for database interaction. Content is managed through MDX files.

The application features a sophisticated and highly-branded "Engineered Hardware" aesthetic, with a strong emphasis on security, performance, and trust. Key features include a portfolio of work, an interactive "Revenue Leak Detector" lab, and a comprehensive admin area for managing clients, projects, and content.

### Key Technologies

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS
*   **Database:** Prisma with a SQLite provider
*   **Authentication:** NextAuth.js
*   **Animation:** Framer Motion
*   **Content:** MDX
*   **Testing:** Vitest (unit), Playwright (E2E)

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

### Testing

To run unit tests:

```bash
npm run test
```

To run end-to-end tests:

```bash
npm run test:e2e
```

## Development Conventions

*   **File Structure:** The project follows a standard Next.js App Router structure.
    *   `app/`: Contains all routes, including API routes (`app/api`).
    *   `components/`: Contains all React components. Reusable UI primitives are in `components/ui`.
    *   `lib/`: Contains utility functions, database client, and other core logic.
    *   `content/`: Contains MDX source files for the "Work" and "Insights" sections.
    *   `prisma/`: Contains the database schema (`schema.prisma`).
*   **Data Fetching:** Data is primarily fetched in Server Components using async/await.
*   **Styling:** Styling is done with Tailwind CSS.
*   **Database:** Database interactions are handled through the Prisma client defined in `lib/prisma.ts`. Schema changes are managed with Prisma Migrate.
*   **Security:** The project has a strong focus on security, with features like AES-256-GCM encryption for secrets, a strict Content Security Policy, rate limiting, and Role-Based Access Control.
*   **Testing:** Unit tests are written with Vitest and are located in the `tests/` directory. End-to-end tests are written with Playwright and are located in the `e2e/` directory.
