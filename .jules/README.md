# Jules - Autonomous Coding Agent Environment

This directory contains scripts and configurations to establish a working environment for Jules.

## Scripts

### `setup.sh`
Initializes the environment.
- Generates a `.env` file with development secrets if missing.
- Installs npm dependencies.
- Installs Playwright browsers.
- Generates Prisma client.
- Sets up SQLite database (migrates and seeds).

Usage:
```bash
bash .jules/setup.sh
```

### `verify.sh`
Runs the standard verification suite to ensure code quality and stability.
- ESLint
- TypeScript Type Checking
- Vitest Unit Tests
- Next.js Build

Usage:
```bash
bash .jules/verify.sh
```

### `reset_db.sh`
Resets the SQLite database (wipes and reseeds).

## Checklist

Refer to `checklist.md` for the standard operating procedure when making changes, derived from `AGENT.md`.

## Logging

Use `JULES_LOG.md` (if created) or standard tool outputs to track progress.
