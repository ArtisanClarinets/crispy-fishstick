# Change Log

## [Unreleased]

### Infrastructure Module ("Truth Engine")
- **Added**: Hub page at `/infrastructure`.
- **Added**: Academy section with interactive MDX widgets (`CloudTaxCalculator`, `VcpuCoreExplainer`).
- **Added**: Workload Estimator wizard (`/infrastructure/estimator`) with physics-based math.
- **Added**: Server Configurator (`/infrastructure/configurator`) with real-time TCO and power validation.
- **Added**: Saved Build system (`/c/[code]`) with 48h TTL using `InfraBuild` model.
- **Added**: CFO Defense Pack export (`/api/infrastructure/cfo-pack`) generating HTML reports.
- **Changed**: Downgraded Prisma to 5.10.2 to resolve SQLite compatibility issues.
- **Changed**: Hardened `app/api/server-config/recommend` with strict Origin and Rate Limiting.
- **Fixed**: `createMany` incompatibility in SQLite by refactoring to `Promise.all`.
- **Fixed**: Missing UI components (`Slider`, `Switch`, `Alert`) added to `components/ui`.

## Decisions
- **Prisma Downgrade**: Downgraded from 7.2.0 to 5.10.2 due to schema incompatibility and `createMany` issues with SQLite in the dev environment.
- **Snapshot Storage**: `InfraBuild` uses JSON columns for snapshots (`skuSnapshotJson`) instead of relational tables to ensure immutability and schema flexibility for ephemeral builds.
- **Client-Side Math**: While some logic is shared, the Configurator UI validates against the API (`/validate`) to ensure the Server is the Control Plane for truth/rules.
