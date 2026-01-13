---
description: Completely implements a new feature in the existing source code, from planning to production deployment, ensuring security and quality standards are met.
model: GPT5-mini
name: workflow-add-new-feature
skills: ['prisma-data-model', 'ui-design-system', 'ops-deployment', 'security-best-practices', 'nextjs-app-router', 'react-components', 'tailwind-css', 'zod-validation', 'api-design-security', 'rate-limiting', api-endpoints']
---

# Workflow: Add New Feature

This workflow provides a comprehensive, step-by-step guide for agents to implement new features. Adhering to this process ensures that all features are well-planned, secure, thoroughly tested, and production-ready.

## Phase 1: Feature Definition & Planning

_Goal: Define the feature's scope, architecture, and potential security implications before writing any code._

1.  **Requirement Analysis:**
    *   Review the primary requirements document (e.g., `PRD.md`, `docs/*.pdf`).
    *   Clarify any ambiguities. What is the primary goal? Who are the users? What are the acceptance criteria?

2.  **Architecture & Design:**
    *   Consult `ARCHITECTURE_REVIEW.md` and `REPO_MAP.md` to understand the existing system design.
    *   **Data Model:** Plan any necessary database schema changes in `prisma/schema.prisma`.
    *   **API Design:** Define the necessary API endpoints. Specify their paths (under `app/api/`), HTTP methods, request payloads, and response structures.
    *   **Component Strategy:** Identify which new React components are needed in `components/`. Plan their hierarchy and props. Determine if existing components from `components/ui` can be reused.
    *   **File Structure:** Decide where new files (routes, components, library functions) will be located, following the existing project structure.

3.  **Initial Security Assessment:**
    *   Consult the `SECURITY_REVIEW.md` document for existing security protocols.
    *   Identify the feature's potential threat model:
        *   What new data is being introduced? Is it sensitive?
        *   What are the authorization requirements? (e.g., admin-only, user-specific).
        *   Could this feature be abused (e.g., spamming, data scraping)?
    *   Plan mitigations for identified risks (e.g., rate limiting, specific authorization checks, input validation).

## Phase 2: Backend Development

_Goal: Build the server-side logic, database schema, and secure API endpoints._

1.  **Database Migration:**
    *   Modify `prisma/schema.prisma` with the new models or fields.
    *   Generate a new database migration: `npx prisma migrate dev`.
    *   If seeding is required for the new models, update `prisma/seed.ts` and run `npm run prisma:seed`.

2.  **API Endpoint Implementation:**
    *   Create the new API route files within the `app/api/` directory.
    *   **Security First:**
        *   **Authentication:** Protect endpoints using `next-auth`. Use `lib/auth.ts` to get the user session and ensure a user is logged in where necessary.
        *   **Authorization:** Implement logic to verify the user has the correct permissions to access the endpoint or specific resources.
        *   **Input Validation:** Use `zod` to rigorously validate all incoming request bodies, query parameters, and URL parameters. Never trust user input.
        *   **Rate Limiting:** Apply rate limiting to sensitive or expensive endpoints using `lib/rate-limit.ts`.
    *   Implement the core business logic, interacting with the Prisma client (`lib/prisma.ts`) for database operations.
    *   Structure responses consistently and handle all potential errors with clear, appropriate HTTP status codes and messages.

## Phase 3: Frontend Development

_Goal: Develop the user interface and connect it to the backend APIs._

1.  **Component Creation:**
    *   Build new React components in the `components/` directory.
    *   Use Tailwind CSS for styling, adhering to the project's design system (`VANTUS_THEME.md`, `GUI_design_guide.md`).
    *   Ensure all components are responsive, accessible, and follow established coding patterns.
    *   Leverage `framer-motion` for animations if required, following patterns in `motion-config.tsx`.

2.  **State Management & Data Fetching:**
    *   Use the existing state management solution (`zustand` or React Context) for client-side state.
    *   Fetch data from the newly created API endpoints. Implement logic to handle loading, success, and error states gracefully in the UI.
    *   For mutations (POST, PUT, DELETE), use a secure fetch client that incorporates CSRF protection (see `lib/fetchWithCsrf.ts`).

3.  **Routing:**
    *   Create new pages and layouts within the `app/(site)/` or `app/(admin)/` directories as needed.

## Phase 4: Testing & Quality Assurance

_Goal: Verify that the new feature works as expected, is free of bugs, and doesn't break existing functionality._

1.  **Unit & Integration Testing:**
    *   Write unit tests for new utility functions and business logic using Vitest.
    *   Write integration tests for React components to verify they render and behave correctly.
    *   Place test files in the `tests/` directory.
    *   Run all tests to ensure they pass: `npm run test`.

2.  **End-to-End (E2E) Testing:**
    *   Create a new Playwright spec file in `e2e/` that simulates the full user flow for the feature.
    *   The test should cover the "happy path" as well as common edge cases and error conditions.
    *   Run the E2E tests: `npm run test:e2e`.

3.  **Code Quality Checks:**
    *   Ensure the code adheres to the project's style guide by running the linter: `npm run lint`.
    *   Fix any linting errors or warnings before proceeding.

## Phase 5: Security & Production Readiness

_Goal: Perform a final review to ensure the feature is secure, documented, and performant._

1.  **Final Security Review:**
    *   Holistically review the feature against the OWASP Top 10.
    *   **No Hardcoded Secrets:** Double-check that no API keys, passwords, or other secrets have been committed. Use environment variables as defined in `env.example`.
    *   **Access Control:** Verify that every API endpoint has the correct authentication and authorization checks.
    *   **Data Exposure:** Ensure that API responses do not leak sensitive user or system information.
    *   **Dependencies:** If new dependencies were added, check them for known vulnerabilities.

2.  **Documentation:**
    *   Update `README.md` or other relevant documentation in `docs/` to reflect the new feature.
    *   If the feature introduces new architectural patterns or is particularly complex, create a dedicated markdown file for it.
    *   Add comments to the code where the logic is complex or non-obvious.

3.  **Final Checks:**
    *   Create a production build to ensure there are no build errors: `npm run build`.
    *   Manually test the feature one last time in a production-like environment.

## Phase 6: Deployment

_Goal: Deploy the feature to production and verify its stability._

1.  **Merge & Deploy:**
    *   Merge the feature branch into the main branch.
    *   Follow the project's deployment process as outlined in `PRODUCTION_DEPLOYMENT.md`.

2.  **Post-Deployment Verification:**
    *   Monitor application logs for any errors related to the new feature.
    *   Verify that the feature is functioning correctly in the production environment.
