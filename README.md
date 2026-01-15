<div align="center">
  <img src="https://raw.githubusercontent.com/Thompson-Development/vantus-new-design-system/main/.github/vantus-logotype-dark.svg" alt="Vantus Logotype" width="400">
  <br/>
  <p><strong>Engineering for High-Trust Products.</strong></p>
</div>

[![Build Status](https://img.shields.io/github/actions/workflow/status/Thompson-Development/crispy-fishstick/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/Thompson-Development/crispy-fishstick/actions)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg?style=for-the-badge)](https://github.com/Thompson-Development/crispy-fishstick/blob/main/README.md#%EF%B8%8F-license)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

**Vantus** is the official web presence for the Vantus Systems engineering studio, a consultancy founded by Dylan Thompson. It serves as a high-trust entry point for enterprise clients, demonstrating technical rigor, transparent processes, and premium user experience through its own implementation.

**Live Site:** [**vantus.dev**](https://vantus.dev)

## ✨ Key Features

This repository isn't just a website; it's a demonstration of our engineering philosophy.

*   **Server-First Architecture:** Built on the bleeding-edge Next.js 16 App Router and React 19, leveraging Server Components for optimal performance and a minimal client-side footprint.
*   **Interactive Lead Generation:** A "60-Second Audit" modal (`AuditModal`) acts as an interactive questionnaire, providing real-time analysis and tailored recommendations to qualify high-value leads.
*   **Trust-Building Modules:** The "Build Plan Module" (`BuildPlanModule`) visualizes the end-to-end engineering process, demystifying engagements for non-technical founders and building client confidence.
*   **Procedural & Generative Art:** Unique, procedurally generated cover art for case studies (`CoverArt`) and an interactive, mouse-aware grid background (`HeroBackground`) create a memorable and technically impressive user experience.
*   **"Trust Center" & Build Proof:** A dedicated `/trust` route for compliance and operational transparency, coupled with an automated build verification system (`scripts/generate-build-proof.mjs`) that generates traceability artifacts for every deployment.
*   **Robust Security Model:** Features include AES-256-GCM encryption, a strict Content Security Policy (CSP), Redis-backed rate limiting, Role-Based Access Control (RBAC), and comprehensive audit logging.
*   **Engineered Design System:** A strictly-typed Tailwind CSS theme with a focus on "engineered hardware" aesthetics, sophisticated `Framer Motion` animations, and a commitment to WCAG AA accessibility standards.

## 🛠 Tech Stack

Vantus is built with a modern, production-ready, and performant technology stack.

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript 5.x](https://www.typescriptlang.org/)
*   **UI Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with custom Vantus theme tokens
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Authentication:** [NextAuth.js v4](https://next-auth.js.org/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Content:** [MDX](https://mdxjs.com/) for case studies and articles
*   **Error Monitoring:** [Sentry](https://sentry.io/)
*   **Unit Testing:** [Vitest](https://vitest.dev/)
*   **E2E Testing:** [Playwright](https://playwright.dev/)

## 🚀 Getting Started

### 1. Prerequisites

*   [Node.js](https://nodejs.org/) version `20.9.0` or higher
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   [Git](https://git-scm.com/)

### 2. Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/Thompson-Development/crispy-fishstick.git
cd crispy-fishstick
npm install
```

### 3. Environment Variables

The project uses environment variables for configuration. An interactive setup script is provided to guide you.

```bash
npm run setup
```

This will create a `.env.local` file based on `env.example` and prompt you for the necessary values.

### 4. Database Setup

This project uses Prisma for database management.

1.  **Generate Prisma Client:** This is usually done automatically after `npm install`, but you can run it manually.
    ```bash
    npx prisma generate
    ```

2.  **Run Migrations:** Apply the database schema to your local database.
    ```bash
    npx prisma migrate dev
    ```

3.  **(Optional) Seed the Database:** Populate the database with initial data.
    ```bash
    npm run prisma:seed
    ```

### 5. Running the Development Server

Start the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing

The application has a comprehensive test suite.

*   **Run Unit Tests:**
    ```bash
    npm run test
    ```
*   **Run End-to-End (E2E) Tests:**
    ```bash
    npx playwright install --with-deps # First time only
    npm run test:e2e
    ```
*   **Run E2E Tests in UI Mode:**
    ```bash
    npm run test:e2e:ui
    ```

## 📦 Build & Deployment

### Building for Production

To create a production-ready build, run the following command. This process also generates a "Build Proof" artifact for integrity verification.

```bash
npm run build
```

The output will be in the `.next` directory. For standalone deployment, use the output in `.next/standalone`.

### Deployment

This repository is configured for production deployment on a Linux server (e.g., Ubuntu 22.04 LTS).

1.  **Automated Bootstrap (Recommended):**
    A bootstrap script is included to automate the entire server setup process, including installing Node.js, Nginx, configuring the database, and setting up a `systemd` service.

    ```bash
    sudo bash scripts/bootstrap-ubuntu22.sh
    ```

2.  **Manual Deployment:**
    For a manual setup, you would typically:
    a. Build the application locally or on a CI/CD server.
    b. Copy the `.next/standalone` directory, `public` directory, and `.next/static` to your server.
    c. Install dependencies: `npm install`.
    d. Set up a reverse proxy (like Nginx) to forward requests to the Node.js process.
    e. Use a process manager (like `systemd` or `pm2`) to run the application.

    ```bash
    # On the server
    npm run start # Starts the server on port 3005 by default
    ```
    A script is provided to generate an Nginx configuration file:
    ```bash
    npm run generate:nginx
    ```

## 📂 Project Structure

```
.
├── app/                  # Next.js App Router: Routes and layouts
│   ├── (site)/           # Main site routes (e.g., home, about)
│   ├── (admin)/          # Admin-only routes
│   ├── api/              # API Route Handlers
│   ├── auth/             # Authentication routes (NextAuth.js)
│   └── ...
├── components/           # Shared React components
│   ├── ui/               # Reusable UI primitives (Shadcn/Radix)
│   └── ...
├── content/              # MDX source files for blogs and case studies
├── lib/                  # Core utilities, helpers, and configurations
├── prisma/               # Database schema, migrations, and seed scripts
├── public/               # Static assets (images, fonts, etc.)
├── scripts/              # Automation and utility scripts (build, setup, etc.)
├── tests/                # Vitest unit and integration tests
└── e2e/                  # Playwright end-to-end tests
```

## 🤝 Contributing

While Vantus is primarily the portfolio of a single studio, contributions in the form of bug reports, feature requests, or pull requests are welcome. Please open an issue to discuss any significant changes before starting work.

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a Pull Request.

## 📄 License

This project is proprietary and all rights are reserved by Vantus Systems. See the [LICENSE](LICENSE) file for more details.

---
<div align="center">
  <p><strong>Vantus Systems &copy; 2024</strong></p>
</div>