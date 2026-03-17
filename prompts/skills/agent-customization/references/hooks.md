# Hooks — Zero-Trust Execution Gates

> **DEFINITION:** Deterministic lifecycle automation hooks that enforce policy, validate operations, and inject runtime context. Unlike instructions (which guide agent behavior non-deterministically), hooks **MUST execute** and can **BLOCK operations**.

---

## Conceptual Framework — Zero-Trust Architecture

Hooks implement a **zero-trust security model** for agent operations:

1. **Never Trust:** Every tool invocation is potentially dangerous
2. **Always Verify:** Pre-tool hooks validate before execution
3. **Enforce Policy:** Post-tool hooks can block on policy violations
4. **Audit Everything:** All hook executions are logged

---

## Locations — Scope & Precedence

| Path | Scope | Persistence | Version Control |
|------|-------|-------------|-----------------|
| `.github/hooks/*.json` | Workspace | Team-shared | ✅ Committed |
| `.claude/settings.local.json` | Workspace local | Ephemeral | ❌ Not committed |
| `.claude/settings.json` | Workspace | Project-specific | ✅ Committed |
| `~/.claude/settings.json` | User profile | Portable | ❌ Settings sync |

> **AGGREGATION MODEL:** All configured hook files are **collected and executed** — workspace and user hooks do NOT override each other. Both run in sequence.

---

## Hook Events — Lifecycle Triggers

| Event | Trigger Condition | Use Case |
|-------|-------------------|----------|
| `SessionStart` | First prompt of new agent session | Initialize context, inject session variables |
| `UserPromptSubmit` | User submits a prompt | Validate prompt, inject context |
| `PreToolUse` | **Before** any tool invocation | Permission gating, input sanitization |
| `PostToolUse` | **After** successful tool execution | Output validation, logging |
| `PreCompact` | Before context compaction | Preserve critical context |
| `SubagentStart` | Subagent begins execution | Inject subagent-specific context |
| `SubagentStop` | Subagent completes | Aggregate subagent results |
| `Stop` | Agent session terminates | Cleanup, final logging |

---

## Configuration Schema — Strict Contract

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15,
        "cwd": "${workspaceFolder}",
        "env": {
          "NODE_ENV": "production"
        },
        "windows": "powershell -File ./scripts/validate-tool.ps1",
        "linux": "./scripts/validate-tool.sh",
        "osx": "./scripts/validate-tool.sh"
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/log-operation.sh",
        "timeout": 10
      }
    ]
  }
}
```

### Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ Yes | Must be `"command"` |
| `command` | string | ✅ Yes | Shell command to execute |
| `timeout` | number | No | Seconds (default: 30) |
| `cwd` | string | No | Working directory (supports `${workspaceFolder}`) |
| `env` | object | No | Environment variables |
| `windows` | string | No | Windows-specific command override |
| `linux` | string | No | Linux-specific command override |
| `osx` | string | No | macOS-specific command override |

---

## Input/Output Contract — JSON Protocol

Hooks receive JSON on **stdin** and MUST return JSON on **stdout** to communicate decisions.

### PreToolUse Input

```json
{
  "hook": {
    "name": "PreToolUse",
    "input": {
      "tool": "bash",
      "toolInput": {
        "command": "rm -rf /",
        "description": "Remove all files"
      }
    }
  },
  "context": {
    "sessionId": "abc123",
    "workspaceFolder": "/workspace/my-project",
    "currentWorkingDirectory": "/workspace/my-project"
  }
}
```

### PreToolUse Output — Permission Decision

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "This command appears dangerous and requires user confirmation"
  }
}
```

#### Permission Decision Values

| Value | Effect | Use Case |
|-------|--------|----------|
| `allow` | Tool executes immediately | Known-safe operations |
| `ask` | Prompts user for confirmation | Operations requiring approval |
| `deny` | **BLOCKS** tool execution, returns error to agent | Dangerous operations |

### PostToolUse Output

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "decision": "continue",
    "systemMessage": "Operation logged to audit trail"
  }
}
```

#### PostToolUse Decision Values

| Value | Effect |
|-------|--------|
| `continue` | Normal flow continues |
| `block` | **Stops** further processing |

---

## Exit Code Routing — Failure Handling

| Exit Code | Effect | Interpretation |
|-----------|--------|----------------|
| `0` | ✅ Success | Hook completed normally |
| `2` | 🔴 **BLOCKING ERROR** | Halts execution; returns error to agent |
| Other | 🟡 Non-blocking warning | Logs warning; continues execution |

### Exit Code Behavior Examples

```bash
#!/bin/bash
# Example: Block dangerous commands

if echo "$TOOL_INPUT" | grep -q "rm -rf /"; then
    echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny"}}'
    exit 2  # BLOCKING - stops execution
fi

echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "allow"}}'
exit 0  # SUCCESS - allows execution
```

---

## Hooks vs. Instructions — Behavioral Contract

| Aspect | Instructions/Prompts/Skills/Agents | Hooks |
|--------|----------------------------------|-------|
| **Determinism** | Non-deterministic — agent may ignore guidance | Deterministic — MUST execute |
| **Failure Mode** | Agent may proceed | Can **BLOCK** operation |
| **Trigger** | Description keyword matching | Lifecycle event |
| **Input/Output** | No contract | JSON stdin/stdout contract |
| **Context Access** | Full context | Limited to event data |
| **Execution** | Parallel with agent | Serial blocking |

### Decision Matrix

| Requirement | Choose |
|-------------|--------|
| Guide agent behavior | Instructions |
| Enforce policy without blocking | PostToolUse with `continue` |
| Block dangerous operations | PreToolUse with `deny` | 
| Require approval for certain tools | PreToolUse with `ask` |
| Inject context per session | SessionStart hook |
| Validate outputs | PostToolUse hook |

---

## Enterprise Security Patterns

### Pattern 1: Dangerous Command Blocker

```bash
#!/bin/bash
# .github/hooks/scripts/block-destructive.sh

DANGEROUS_PATTERNS=(
  "rm -rf"
  "DROP TABLE"
  "DELETE FROM.*WHERE 1=1"
  "curl.*|.*sh"
  "chmod 777"
)

TOOL_INPUT=$(echo "$1" | tr '[:upper:]' '[:lower:]')

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$TOOL_INPUT" | grep -qiE "$pattern"; then
    echo "BLOCKED: Matched dangerous pattern: $pattern"
    echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "Command matches blocked pattern"}}'
    exit 2
  fi
done

echo '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "allow"}}'
exit 0
```

### Pattern 2: Audit Logger

```bash
#!/bin/bash
# .github/hooks/scripts/audit-log.sh

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION_ID="$CLAUDE_SESSION_ID"
TOOL="$1"
COMMAND="$2"

# Write to audit log (append-only)
echo "$TIMESTAMP|$SESSION_ID|$TOOL|$COMMAND" >> .claude/audit.log

echo '{"hookSpecificOutput": {"hookEventName": "PostToolUse", "decision": "continue"}}'
exit 0
```

### Pattern 3: Context Injector

```bash
#!/bin/bash
# .github/hooks/scripts/inject-context.sh

# Inject security policy context
SECURITY_CONTEXT='
## Security Policy
- No credentials in logs
- All API calls require auth
- PII must be redacted
'

echo "{\"hookSpecificOutput\": {\"hookEventName\": \"SessionStart\", \"systemMessage\": \"$SECURITY_CONTEXT\"}}"
exit 0
```

---

## Core Principles — Enterprise Compliance

1. **Minimal Hooks:** Keep hooks small and auditable
2. **Input Validation:** Sanitize all hook inputs before processing
3. **No Secrets:** Never hardcode secrets in hook scripts
4. **Idempotent Logging:** Logging hooks must be safe to run multiple times
5. **Timeout Awareness:** Set appropriate timeouts; default is 30s
6. **Platform Safety:** Use platform overrides for cross-platform compatibility

---

## Anti-Patterns — Strictly Prohibited

| Anti-Pattern | Risk | Correction |
|--------------|------|------------|
| Long-running hooks | Block normal agent flow | Keep < 5 seconds |
| Hooks where instructions suffice | Over-engineering | Use instructions for guidance |
| Unversioned hooks | No audit trail | Commit hooks to `.github/hooks/` |
| No error handling | Silent failures | Always return valid JSON |
| Hardcoded secrets | Security breach | Use environment injection |

---

## Validation Checklist

Before deploying hooks:

- [ ] Hook returns valid JSON on stdout
- [ ] Exit codes correctly signal allow/deny/block
- [ ] Platform-specific commands tested on all targets
- [ ] Timeout values appropriate for operation
- [ ] No hardcoded secrets
- [ ] Hooks are version-controlled
- [ ] Audit trail configured for security-critical hooks
