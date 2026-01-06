# GEMINI Project Analysis: Thompson Systems

## Project Overview

This repository contains the source code for **Thompson Systems**, the portfolio and diagnostic tools of Dylan Thompson. It is a high-trust, production-grade web application built with a modern, server-first architecture.

The project is a full-stack application leveraging **Next.js 14**'s App Router and React Server Components to ensure optimal performance. It features a custom MDX-based content pipeline for case studies and insights, interactive client-side tools like a "Revenue Leak Detector," and a strong emphasis on security and operational transparency.

The user interface is built with **Tailwind CSS**, **Framer Motion** for animations, and **Radix UI** primitives, following an "Engineered Hardware" aesthetic that prioritizes clarity, reliability, and performance.

## Key Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Database ORM:** Prisma
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui patterns using Radix UI
- **Animation:** Framer Motion
- **Unit Testing:** Vitest
- **End-to-End Testing:** Playwright
- **Authentication:** NextAuth.js
- **Content:** MDX

## Building and Running

### Prerequisites

- Node.js 18+
- npm

### Installation

Install the necessary dependencies:

```bash
npm install
```

### Development

To start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

This command also generates a "Build Proof" artifact, which is a key feature of the project's trust and transparency system.

### Running in Production

To start the application in production mode after building:

```bash
npm run start
```

## Testing

The project has a comprehensive testing suite.

### Unit Tests

To run unit and integration tests using Vitest:

```bash
npm run test
```

To run Vitest in watch mode:

```bash
npm run test:watch
```

### End-to-End Tests

To run end-to-end tests using Playwright:

```bash
# First, ensure browser binaries are installed
npx playwright install

# Run the E2E test suite
npm run test:e2e
```

## Development Conventions

- **Code Style:** The project uses ESLint for code linting. Run `npm run lint` to check for issues.
- **TypeScript:** The codebase is written in TypeScript with strict mode enabled, ensuring type safety.
- **Component-Based Architecture:** The project is organized into reusable React components, located in the `components/` directory. UI primitives are separated in `components/ui/`.
- **Content as Code:** Case studies and insights are managed as MDX files within the `content/` directory.
- **Database:** Database schema is managed with Prisma (`prisma/schema.prisma`). Use `npm run prisma:migrate` to apply schema changes.
- **Security:** The application incorporates several security features, including AES-256-GCM encryption for secrets, a strict Content Security Policy (CSP), rate limiting, and Role-Based Access Control (RBAC).
