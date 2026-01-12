---
name: ops-deployment
description: Procedures for building, verifying, and deploying the application using Vantus Systems specific scripts.
---

# Ops Deployment

This skill details the custom build and deployment pipeline for Project SENTINEL.
Use this skill when performing ops tasks, troubleshooting builds, or explaining the deployment process.

## 1. Build Process

We do not use a standard `next build`. We use a "Build Proof" system.

*   **Command**: `npm run build`
*   **What it does**:
    1.  Runs `scripts/generate-build-proof.mjs`.
    2.  Generates a cryptographic proof of the build (git commit, timestamp, dependency hash).
    3.  Runs `next build`.
*   **Artifact**: This process creates artifacts used by the `/proof` runtime endpoints to verify system integrity.

## 2. Server Bootstrap (Ubuntu 22.04)

For a fresh production server, we use a single automated script.

*   **Script**: `scripts/bootstrap-ubuntu22.sh`
*   **Actions**:
    *   Creates `vantus` system user.
    *   Installs Node.js, Nginx, SQLite, Certbot.
    *   Sets up directory structure (`/var/www/vantus`).
    *   Configures firewall (UFW).
    *   Runs the build and migration.
    *   Sets up Systemd and Nginx.

## 3. Environment Setup

Configuration is handled interactively to ensure security.

*   **Script**: `scripts/setup-env.js`
*   **Usage**: `node scripts/setup-env.js` (or via bootstrap).
*   **Features**:
    *   Auto-generates secure secrets (`NEXTAUTH_SECRET`, `MFA_ENCRYPTION_KEY`).
    *   Configures database URL and admin credentials.
    *   Writes to `.env` (local) or `/etc/default/vantus` (production).

## 4. Nginx Configuration

We generate Nginx config programmatically to ensure security headers and best practices.

*   **Script**: `scripts/generate-nginx-config.mjs`
*   **Usage**: `npm run generate:nginx` (requires env vars `DEPLOY_DOMAIN`, `DEPLOY_PORT`, etc.).
*   **Key Features**:
    *   Enforces HSTS.
    *   Configures strict CSP headers.
    *   Sets up reverse proxy to Next.js (default port 3000).
    *   Handles static file caching.

## 5. Security & Verification

*   **Build Proof**: The app exposes `/proof/build.json` to prove what code is running.
*   **Headers**: The app and Nginx cooperate to enforce strict security headers (CSP, X-Frame-Options).
*   **User**: The app runs as the unprivileged `vantus` user, not root.
