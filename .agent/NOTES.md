# Notes — The Living Blueprint

## Environment
- OS: Linux
- Repo root used: `/home/meb/crispy-fishstick` (requested `/mnt/data/...` did not exist on this machine)

## Commands & outputs (baseline first)

### Versions
- `node -v` → v22.21.1
- `npm -v` → 11.7.0

### Baseline: `npm install`
- Result: success
- Notable output:
	- `removed 244 packages, and audited 679 packages in 995ms`
	- `found 0 vulnerabilities`

### Baseline: `npm run build`
- Result: build completed, but emitted an ESLint error during Next’s lint/typecheck phase:
	- `ESLint: Invalid Options: - Unknown options: useEslintrc, extensions`

### Baseline: `npm run lint`
- Result: FAILED (exit 2)
- Error:
	- ESLint v9 requires `eslint.config.*` (flat config) and doesn’t pick up `.eslintrc.*` by default.

### Baseline: `npm run test:e2e`
- Result: PASS (11 tests)
- Note: webserver still printed the same ESLint invalid options message.

