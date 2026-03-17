# Engineering Charter — Repository Conventions

**Document ID:** VS-ENG-304  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Audience:** All Engineering Contributors  
**Owner:** Dylan Thompson, Founder & CTO

---

## Our Repository Philosophy

Vantus repositories are optimized for:

1. **Maintainability:** Future engineers can understand the code.
2. **Transparency:** Everything important is documented.
3. **Atomic Changes:** One commit = one conceptual change.

We value "boring" code over "clever" code. If you are proud of how tricky your solution is, refactor it.

---

## Naming Conventions

### Variables and Functions

**Principle:** Clarity over brevity.

```typescript
// Good: Clear intent
async function getUserSubscriptionStatus(userId: string): Promise<Status> {
  // ...
}

// Bad: Cryptic
async function getStat(u: string) {
  // ...
}
```

### Booleans

Prefix with `is`, `has`, `can`, or `should`:

```typescript
const isLoading = true;
const hasPermission = false;
const canEdit = true;
const shouldRetry = false;
```

### Constants

Use UPPER_SNAKE_CASE for true constants:

```typescript
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT_MS = 5000;
const API_BASE_URL = "https://api.vantus.systems";
```

### Components

Use PascalCase for React components:

```typescript
// Good
export function UserProfileCard() {}

// Bad
export function userProfileCard() {}
```

### Files

| Type       | Convention               | Example                   |
| ---------- | ------------------------ | ------------------------- |
| Components | PascalCase               | `UserProfile.tsx`         |
| Utilities  | camelCase                | formatDate utility file   |
| Constants  | camelCase or UPPER_SNAKE | config or constants file  |
| Types      | PascalCase               | user type definition file |
| Tests      | Same as file + `.test`   | `UserProfile.test.tsx`    |

---

## Git Workflow

### Branch Strategy

```
main                    → Production-ready code
  ├── feat/new-feature  → New features
  ├── fix/bug-fix       → Bug fixes
  ├── docs/update       → Documentation changes
  └── chore/cleanup     → Maintenance tasks
```

**Rules:**

- `main` is always deployable.
- All changes go through pull requests.
- No direct pushes to `main`.

### Branch Naming

```
feat/user-authentication
fix/login-redirect-loop
docs/api-endpoints
chore/update-dependencies
```

### Commit Messages

Use conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting (no code change)
- `refactor:` Code change that neither fixes nor adds
- `test:` Adding or correcting tests
- `chore:` Maintenance tasks

**Examples:**

```
feat(auth): add password reset flow

fix(api): handle null response from external service

docs(readme): update installation instructions

test(user): add unit tests for validation logic
```

### Atomic Commits

One commit = one conceptual change.

**Good:** Three commits for three related changes.

```
feat(user): add email validation
feat(user): implement password hashing
feat(user): create login endpoint
```

**Bad:** One commit with mixed concerns.

```
feat: various user updates and fixed a bug in orders
```

---

## Pull Request Standards

### PR Description Template

Every PR must answer:

```markdown
## What Changed

(Brief description of the change)

## Why This Approach

(Explain your reasoning)

## How It Was Verified

- [ ] Tests pass
- [ ] Linting passes
- [ ] Manual testing completed
- [ ] Documentation updated

## Risk Level

- [ ] Low (docs, tests, minor fixes)
- [ ] Medium (feature additions)
- [ ] High (architectural changes)

## Rollback Strategy

(How to revert if needed)
```

### PR Size

**Target:** Under 400 lines of code changed.

**Maximum:** 800 lines (requires special justification).

**Why:** Large PRs are hard to review thoroughly. Bugs slip through.

### Review Requirements

- **At least one** senior engineer approval required.
- **All CI checks** must pass (tests, linting, type checking).
- **No unresolved** review comments.

### Reviewer Responsibilities

Reviewers check for:

1. Correctness (does it work?).
2. Security (any vulnerabilities?).
3. Performance (any obvious issues?).
4. Maintainability (can someone else understand this?).
5. Testing (are there tests? do they cover edge cases?).

If you approve a PR, you share responsibility for its quality.

---

## File System & Modules

### Feature-Sliced Design (FSD)

See `./ARCHITECTURE_OVERVIEW.md` for full FSD documentation.

### Directory Structure

```
src/
├── app/              # Next.js routing (entry points only)
├── pages/            # Page compositions
├── widgets/          # Complex UI blocks
├── features/         # User actions
├── entities/         # Business models
└── shared/           # Reusable utilities
    ├── ui/           # UI primitives
    ├── lib/          # Utilities
    ├── api/          # API clients
    └── config/       # Configuration
```

### File Organization

Each component lives in its own directory:

```
UserProfile/
├── index.ts          # Public export
├── UserProfile.tsx   # Component
├── UserProfile.test.tsx
├── UserProfile.module.css (or inline Tailwind)
└── types.ts          # Component-specific types
```

---

## Documentation Discipline

### Code Comments

Comment the **why**, not the **what**:

```typescript
// Bad: States the obvious
// Increment counter
counter++;

// Good: Explains reasoning
// We increment before saving to ensure IDs start at 1, not 0
// This matches the legacy system expectations
counter++;
```

### JSDoc for Public APIs

```typescript
/**
 * Calculate the total price including tax.
 *
 * @param subtotal - Price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price with tax, rounded to 2 decimal places
 * @throws Error if subtotal is negative
 *
 * @example
 * const total = calculateTotal(100, 0.08); // 108.00
 */
function calculateTotal(subtotal: number, taxRate: number): number {
  if (subtotal < 0) throw new Error("Subtotal cannot be negative");
  return Math.round(subtotal * (1 + taxRate) * 100) / 100;
}
```

### External Documentation

The `/docs` folder at repository root is the single source of truth.

**Keep it synchronized:**

- Code changes → Update docs in same PR.
- API changes → Update endpoint documentation.
- New patterns → Create an ADR.

---

## Refactoring & Code Health

### The Scout Rule

"Leave the code better than you found it."

When working in a file:

- Fix typos you notice.
- Clarify confusing variable names.
- Add a test if coverage is missing.

**But:** Do not refactor unrelated code in a feature PR. Keep changes focused.

### No Silent Rewrites

Do not refactor code unrelated to your task without:

1. A separate PR labeled `refactor:`.
2. Explicit approval from project lead.
3. Full regression testing.

**Why:** "Harmless" refactors break things. Isolation makes bugs easier to find.

### Tech Debt Tracking

When you encounter debt you cannot fix immediately:

```typescript
<!-- RESOLVED PLACEHOLDER -->
// Currently using legacy endpoint for backward compatibility
// Target fix: 2026-03-01
```

- Create a ticket in your project tracker.
- Reference the ticket in the comment.
- Include a target date (max 30 days for high-priority debt).

---

## Scripting & Automation

### Script Location

All automation lives in `/scripts`:

```
scripts/
├── deploy/           # Deployment scripts
├── backup/           # Backup scripts
├── setup/            # Environment setup
└── ci/               # CI/CD helpers
```

### Idempotency

Scripts must be safe to run multiple times:

```bash
# Good: Checks before acting
if [ ! -d "/var/app" ]; then
  mkdir -p /var/app
fi

# Bad: Fails on second run
mkdir /var/app  # Error: directory exists
```

### Script Documentation

Every script starts with a header:

```bash
#!/bin/bash
#
# Name: deploy-production.sh
# Purpose: Deploy application to production environment
# Usage: ./deploy-production.sh [version-tag]
# Requirements: AWS CLI, Docker, kubectl
# Author: Dylan Thompson
# Date: 2026-02-02
#
```

---

## Dependencies

### Adding New Dependencies

Before adding a new library, ask:

1. **Is it necessary?** Can we do this with built-in features?
2. **Is it maintained?** Last commit within 6 months? Active issues?
3. **Is it secure?** No known vulnerabilities? Audited?
4. **Is it compatible?** Works with our stack? License acceptable?

### Approval Required

New dependencies require:

- Security scan pass.
- License compatibility check.
- Brief justification in PR description.

### Lock Files

Always commit lock files:

- package-lock.json (npm)
- `yarn.lock` (yarn)
- npm lockfile yaml (npm)

---

## Enforcement

### Pre-Commit Hooks

Automated checks run before every commit:

- Linting (ESLint)
- Type checking (TypeScript)
- Formatting (Prettier)
- Secret scanning (detect-secrets)

### CI/CD Checks

Pull requests are blocked until:

- All tests pass.
- Coverage meets thresholds.
- Security scan passes.
- Build completes successfully.

---

**Questions about repository conventions?** Contact: dylan.thompson@vantus.systems

[End of Document VS-ENG-304]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
