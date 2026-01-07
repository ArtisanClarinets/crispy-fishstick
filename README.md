# Thompson Systems

**Engineering for High-Trust Products.**

Thompson Systems is a specialized engineering studio for founders who demand production-grade quality, rigorous systems, and Apple-caliber interfaces. This repository contains the source code for the portfolio and diagnostic tools of Dylan Thompson.

## ⚡ Key Features

- **Server-First Architecture:** Leverages Next.js 14 App Router and React Server Components for optimal performance and minimal client-side JavaScript.
- **MDX Content Pipeline:** Custom MDX implementation for 'Work' case studies and 'Insights', featuring specialized components like `Callout`, `MetricGrid`, and `Figure`.
- **Revenue Leak Detector:** An interactive client-side lab (`/lab/revenue-leak`) featuring custom SVG projection charts and technical remediation logic.
- **Trust-First Design:**
  - **Build Proof System:** Automated generation of build verification artifacts (`scripts/generate-build-proof.mjs`) ensuring traceability.
  - **Console HUD:** A persistent overlay displaying session timing and build status, emphasizing transparency.
  - **Trust Center:** Dedicated route (`/trust`) for compliance and operational transparency.
- **Premium Interface:**
  - **System Layer:** A persistent visual layer rendering coordinate grids, scanlines, and ambient glows.
  - **Motion:** Sophisticated animations using `Framer Motion`, including shared element transitions and custom "decoding" text effects (`ScrambleText`).
  - **Design System:** Strictly typed Tailwind CSS with a focus on "engineered hardware" aesthetics (JetBrains Mono, precise borders).

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **UI Primitives:** [Radix UI](https://www.radix-ui.com/) (via shadcn/ui patterns)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Security:**
  - AES-256-GCM Encryption for secrets (MFA)
  - Strict Content Security Policy (CSP)
  - Rate Limiting (Database backed)
  - Safe Data Serialization (DTOs)
  - Private File Uploads with Type Validation
  - Role-Based Access Control (RBAC) with JIT Access
  - Audit Logging with Redaction
- **Testing:**
  - Unit: [Vitest](https://vitest.dev/)
  - E2E: [Playwright](https://playwright.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Production Deployment

For complete production setup on Ubuntu 22.04 LTS:

```bash
# Clone the repository
git clone https://github.com/Thompson-Development/crispy-fishstick.git
cd crispy-fishstick

# Run automated bootstrap script
sudo bash scripts/bootstrap-ubuntu22.sh
```

The bootstrap script will:
- Install all dependencies (Node.js, Nginx, SQLite, Certbot)
- Configure environment variables interactively
- Set up database with migrations
- Build the application
- Configure Nginx reverse proxy
- Set up Systemd service
- Optionally install SSL certificates

**See [docs/PRODUCTION_DEPLOYMENT.md](docs/PRODUCTION_DEPLOYMENT.md) for complete deployment documentation.**

### Build

Create a production build. This process also generates the "Build Proof" artifact.

```bash
npm run build
```

### Testing

**Unit Tests (Vitest):**

```bash
npm run test
```

**End-to-End Tests (Playwright):**

```bash
# Install browsers first if needed
npx playwright install

# Run tests
npm run test:e2e
```

## 📂 Project Structure

```text
├── app/                  # Next.js App Router routes
│   ├── api/              # API Route Handlers
│   ├── lab/              # Interactive tools (Revenue Leak Detector)
│   ├── work/             # Case studies
│   └── ...
├── components/           # React components
│   ├── ui/               # Reusable UI primitives (Radix/shadcn)
│   ├── mdx/              # Custom MDX components
│   └── ...
├── content/              # MDX source files
│   ├── insights/
│   └── work/
├── lib/                  # Utilities and configuration
│   ├── site.ts           # Global site config
│   └── ...
├── public/               # Static assets
├── scripts/              # Build and utility scripts
├── tests/                # Unit tests
└── e2e/                  # End-to-end tests
```

## 🎨 Design Philosophy

The interface follows an "Engineered Hardware" aesthetic, prioritizing:

- **Clarity:** Code that explains itself. Interfaces that need no manual.
- **Reliability:** Systems designed to fail safely and recover instantly.
- **Performance:** Sub-100ms interactions. Core Web Vitals optimized.
- **Accessibility:** Inclusive by default with WCAG AA compliance.

## 📄 License

Proprietary. All rights reserved by Thompson Systems.
