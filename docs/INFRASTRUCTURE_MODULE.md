# Infrastructure Module

## Overview
The Infrastructure module ("Truth Engine") provides transparency into hardware economics. It consists of:
1.  **Hub**: Entry point (`/infrastructure`).
2.  **Academy**: Educational MDX content (`/infrastructure/academy`).
3.  **Estimator**: Physics-based sizing wizard (`/infrastructure/estimator`).
4.  **Configurator**: Interactive build tool with validation (`/infrastructure/configurator`).

## Routes
- `GET /infrastructure`: Hub.
- `GET /infrastructure/academy`: Academy Index.
- `GET /infrastructure/academy/[slug]`: Article.
- `GET /infrastructure/estimator`: Workload wizard.
- `GET /infrastructure/configurator`: Build tool.
- `GET /c/[code]`: Read-only saved build.

## API Contracts

### POST /api/infrastructure/estimate
- **Input**: `EstimatorWizardState` (JSON)
- **Output**: `EstimatorResult` (JSON)
- **Security**: Origin check, Rate limit (20/min), No-Store.

### POST /api/infrastructure/configurator/validate
- **Input**: `ConfiguratorState` (JSON)
- **Output**: `ValidationResult` (JSON)
- **Security**: Origin check, Rate limit (50/min), No-Store.

### POST /api/infrastructure/builds
- **Input**: `{ state: ConfiguratorState, validation: ValidationResult }`
- **Output**: `{ code: string, expiresAt: string }`
- **Security**: Origin check, Rate limit (10/min).

### POST /api/infrastructure/builds/[code]/reserve
- **Input**: None (Path param `code`)
- **Output**: `{ status: "reserved", expiresAt: string }`
- **Security**: Origin check, Rate limit (5/min).

### POST /api/infrastructure/cfo-pack
- **Input**: `{ email: string, name?: string, buildCode?: string }`
- **Output**: HTML File Download (Attachment)
- **Security**: Origin check, Rate limit (5/hr).

## Data Model
- **InfraBuild**: Stores immutable snapshots of configurations (JSON blobs) to avoid schema rigidity. TTL 48 hours.
- **InfraReservation**: Temporary hold on inventory (scaffolded).

## Security Posture
- All mutations are protected by `proxy.ts` headers (CSP, Nonce).
- API routes enforce strict Origin checks (allow same-origin only in prod).
- Zod validation for all inputs.
- Normalized error responses.

## Performance
- Estimator and Configurator logic runs server-side (via API) or in lightweight client components.
- No heavy chart libraries used (native DOM or simple CSS/SVG).
