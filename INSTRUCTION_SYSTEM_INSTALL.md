
# Install: Crispy-Fishstick Instruction System

## 1) Unzip into repo root
- Unzip `crispy-fishstick-instruction-system.zip` into your repository root.
- Commit the resulting changes.

## 2) Enable in GitHub Copilot / VS Code
- Ensure Copilot Chat is enabled for the repo.
- Copilot will automatically detect:
  - `.github/copilot-instructions.md`
  - `.github/instructions/*.instructions.md`
  - `.github/skills/**/SKILL.md` (Agent Skills)
  - `.github/prompts/*.prompt.md` (optional)

## 3) Validation (first run)
Run:
- `npm run lint`
- `npm test`
- `npm run build`

No code is changed by this instruction suite—only agent behavior and documentation discipline.

## 4) Operating rule
Every PR that changes code must:
- update the correct docs (see `.github/skills/docs-update/SKILL.md`)
- append a short entry to `.agent/EXECUTION_LOG.md`
