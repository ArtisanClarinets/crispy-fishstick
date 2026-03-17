---
name: project-setup-local
description: Enterprise-grade project initialization and scaffolding for Next.js, Nuxt, Vite, VS Code Extensions, Python, and MCP servers. Use when bootstrapping a new repository from an empty directory.
argument-hint: Specify the framework or project type (e.g., 'Next.js', 'Nuxt', 'MCP', 'Python package')
---

# Enterprise Project Initialization

## Objective & Scope
This skill provides a strict, deterministic workflow for scaffolding new local projects. It ensures that all initialized repositories adhere to baseline structural requirements, utilize the correct build tools, and are pre-configured for modern deployment environments.

## Trigger Conditions
* Explicit invocation via `/project-setup-local`
* User requests to "start a new Next.js project," "bootstrap a Vite app," or "create a new Python package."
* User asks to initialize an MCP server.

## Phase 1: Pre-Flight Validation
Before executing any scaffolding commands, you MUST verify the environment:
1. **Directory Check:** Ensure the target directory is completely empty. If files exist (other than `.git`), halt and ask the user for confirmation to proceed.
2. **Toolchain Check:** Verify that the required package manager (`npm`, `pnpm`, or `yarn`) or runtime (`python3`) is available in the current environment.

## Phase 2: Execution Workflow

Select the appropriate framework and strictly execute the associated scaffolding logic.

### 1. Next.js (App Router Standard)
**Command:** `npx create-next-app@latest .`
**Mandatory Arguments (Unless overridden by user):**
* `--ts` (TypeScript is required for enterprise builds)
* `--tailwind` (Tailwind CSS)
* `--eslint` (Strict linting)
* `--app` (App Router)
* `--src-dir` (Keep root clean)
**Post-Scaffold:** Automatically generate a baseline `docker-compose.yml` for local PostgreSQL database hosting, and ensure Vercel deployment configurations (`next.config.js`) are optimized.

### 2. Nuxt / Vite (High-Performance Frontend)
**Nuxt Command:** `npx nuxi@latest init .`
**Vite Command:** `npx create-vite@latest .`
**Vite Arguments:** `-t [vanilla-ts | vue-ts | react-ts | svelte-ts]` (Always default to the `-ts` TypeScript variants).
**Post-Scaffold:** Run the package manager install command immediately (e.g., `npm install`).

### 3. VS Code Extension
**Command:** `npx --package yo --package generator-code -- yo code . --skipOpen`
**Mandatory Arguments:**
* `-t ts` (Strictly use TypeScript)
* `--pkgManager npm`
* `--bundler esbuild` (For faster compilation)
**Pre-Requisite:** You MUST call the `get_vscode_api` tool with the user's specific feature request to gather reference documentation *before* scaffolding.

### 4. Model Context Protocol (MCP) Server
**Command:** Varies by language (Default to TypeScript).
**Execution Steps:**
1. Call `fetch_webpage` on `https://modelcontextprotocol.io/llms-full.txt` to pull the latest SDK implementation standards.
2. Initialize the project with the appropriate language toolchain.
3. **Crucial:** Generate `.vscode/mcp.json` with the following strict structure:
   `{ "servers": { "[unique-server-name]": { "type": "stdio", "command": "[start-command]", "args": [] } } }`
4. Update the `.github/copilot-instructions.md` file to include references to the newly implemented SDK.

### 5. Python Automation (Scripts & Packages)
**Command Context:** Use the internal VS Code command pipeline.
**Execution Steps:**
1. Call `run_vscode_command` (or `copilot_runVscodeCommand`).
2. **For a single script:** Pass args `["python-script", "true", "Project Name", "/path"]`
3. **For a distributable package:** Pass args `["python-package", "true", "Package Name", "/path"]`
**Post-Scaffold:** Ensure `ms-python.python` and `ms-python.vscode-python-envs` are recommended in the `.vscode/extensions.json` file.

## Phase 3: Quality Gates & Acceptance Criteria
* **Validation:** The target directory must contain the expected scaffolding files (e.g., `package.json`, `tsconfig.json`, `pyproject.toml`).
* **Fallback:** If a scaffolding command fails (e.g., due to a network timeout), output the exact error log and suggest the manual command the user should run.
