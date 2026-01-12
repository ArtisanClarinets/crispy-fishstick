---
name: claude-skill-creator
description: Create and structure Claude Code Skills with best practices. Use when building custom Skills, setting up Skill directories, writing SKILL.md files, or creating reusable Claude capabilities.
---

# Claude Skill Creator

A comprehensive guide to creating professional, reusable Claude Code Skills that extend Claude's capabilities with domain-specific expertise.

## Quick Start

A basic Skill requires just one file: `SKILL.md` with YAML frontmatter:

```
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
Step-by-step guidance for Claude to follow

## Examples
Concrete examples demonstrating the Skill
```

## Skill Structure

Every production-ready Skill should follow this directory structure:

```
your-skill/
├── SKILL.md              # Required: Main instructions with YAML frontmatter
├── README.md             # Optional: Human-readable documentation
├── REFERENCE.md          # Optional: Detailed API reference or technical docs
├── EXAMPLES.md           # Optional: Comprehensive examples and use cases
├── BEST_PRACTICES.md     # Optional: Domain-specific best practices
└── scripts/
    ├── utility.py        # Optional: Helper scripts Claude can execute
    └── validate.sh       # Optional: Validation or setup scripts
```

## Required YAML Frontmatter

Every SKILL.md must include YAML frontmatter with:

### `name` (required)

- Maximum 64 characters
- Only lowercase letters, numbers, and hyphens
- No XML tags
- Cannot contain: "anthropic" or "claude"
- Example: `my-data-processor` ✓, `MyDataProcessor` ✗

### `description` (required)

- Maximum 1024 characters
- Must be non-empty
- No XML tags
- Should explain BOTH:
  1. What the Skill does
  2. When Claude should use it
- Example: "Extract and analyze data from CSV files. Use when the user mentions CSV, data analysis, or spreadsheet processing."

## Writing Effective SKILL.md

### Structure Your Instructions

**1. Overview Section**
Briefly explain what this Skill enables Claude to do:

```
## Overview
This Skill enables Claude to create professional presentations from content,
handling layout, formatting, and slide organization automatically.
```

**2. Key Concepts**
Define essential terms or workflows:

```
## Key Concepts
- **Slide deck**: A presentation with ordered slides
- **Theme**: Visual styling applied across all slides
- **Layout templates**: Pre-designed slide structures
```

**3. Step-by-Step Workflows**
Provide clear procedures Claude can follow:

```
## Creating a Basic Presentation

1. Gather content from user
2. Organize into logical sections
3. Design slide hierarchy
4. Apply consistent formatting
5. Validate structure
6. Generate output
```

**4. Examples**
Provide concrete, runnable examples:

```
## Example: Data Report Presentation

User request: "Create a Q4 sales report presentation"

Steps:
1. Create presentation with title slide
2. Add section: "Executive Summary" with key metrics
3. Add section: "Regional Performance" with charts
4. Add conclusion with call-to-action
```

**5. Tools and Techniques**
Document available tools and patterns:

```
## Using Python with Your Skill

You have access to:
- pdfplumber: Extract PDF content
- openpyxl: Work with Excel files
- python-docx: Create Word documents
```

**6. Error Handling**
Explain how to handle common issues:

```
## Common Issues and Solutions

**Issue**: File format not recognized
**Solution**: Check file extension and try alternative parsers

**Issue**: Missing required data
**Solution**: Request missing fields from user before proceeding
```

**7. Advanced Techniques**
For complex Skills, include advanced patterns:

```
## Advanced: Custom Validators

Create validation functions to ensure output quality:
- Syntax validation
- Content completeness checks
- Format consistency verification
```

## Progressive Content Loading

Design your Skill with three levels of content:

### Level 1: Metadata (Always Loaded)

```yaml
---
name: document-processor
description: Process and transform documents. Use for PDF editing, content extraction, format conversion.
---
```

Token cost: ~100 tokens per Skill

### Level 2: Instructions (When Triggered)

Main SKILL.md body with workflows and guidance.
Token cost: Under 5k tokens

### Level 3: Resources (As Needed)

Reference files, scripts, and additional documentation only loaded when needed.
Token cost: Effectively unlimited (no context penalty)

## Best Practices

### 1. Clear, Action-Oriented Descriptions

```
✓ Good: "Extract tables from PDF documents and convert to CSV format"
✗ Bad: "Does stuff with PDFs"

✓ Good: "Analyze code for security vulnerabilities and generate remediation steps"
✗ Bad: "Code analysis tool"
```

### 2. Include When-to-Use Guidance

```
---
description: Analyze financial data and generate reports with visualizations.
             Use when processing spreadsheets, financial data, budget analysis,
             or when the user requests charts and trend analysis.
---
```

### 3. Provide Defensive Examples

Show what NOT to do:

```
## Example: Incorrect vs Correct Usage

**Don't**:
- Process files without checking existence
- Skip validation of external input

**Do**:
- Always verify file paths exist
- Validate and sanitize user input
- Provide clear error messages
```

### 4. Document Dependencies

```
## Prerequisites

This Skill requires:
- Python 3.9+
- Libraries: openpyxl, pandas, matplotlib
- Access to filesystem for reading/writing files
```

### 5. Create Focused Skills

Each Skill should have one clear purpose:

```
✓ Good: "email-template-generator" - Creates reusable email templates
✗ Bad: "do-everything" - General-purpose task handler
```

### 6. Design for Reusability

Write instructions that work across multiple scenarios:

```
## Template Generation

The workflow adapts to different template types:
- Transactional emails (confirmations, receipts)
- Marketing emails (newsletters, promotions)
- Notification emails (alerts, reminders)
- Administrative emails (reports, updates)
```

## Security Considerations

### What a Malicious Skill Can Do

- Invoke tools in unintended ways
- Execute arbitrary code
- Access sensitive data
- Exfiltrate information

### Protection Strategies

1. **Only use Skills from trusted sources**
2. **Audit all bundled files** before using
3. **Check for suspicious patterns**:
   - Unexpected network calls
   - Unusual file access patterns
   - Operations not matching Skill's stated purpose
4. **Be cautious with external URLs** - fetched content may be compromised

## Runtime Constraints

Skills run in a code execution container with these limitations:

| Constraint                  | Details                               |
| --------------------------- | ------------------------------------- |
| **No network access**       | Cannot make external API calls        |
| **No package installation** | Only pre-installed packages available |
| **Filesystem access**       | Can read/write within container       |
| **Available packages**      | See code execution documentation      |
| **Bash commands**           | Full bash access for scripting        |

## Available Tools and Packages

### Pre-installed Packages

- Python scientific stack: pandas, numpy, scipy, scikit-learn
- Document processing: openpyxl, python-docx, pdfplumber, reportlab
- Data tools: matplotlib, seaborn, plotly
- Utilities: requests, beautifulsoup4, lxml, PyYAML

### File Operations

- Read/write files with Python or bash
- Execute shell scripts
- Create temporary files for processing

### Code Execution

- Python scripts (any version)
- Bash commands and scripts
- Chained operations

## Sharing Your Skill

### On Claude.ai

Upload as zip file through Settings > Features (Pro/Max/Team/Enterprise with code execution)

### Via Claude API

Upload using `/v1/skills` endpoints - available workspace-wide

### In Claude Code

Filesystem-based in `.claude/skills/` - personal or project-specific

### GitHub Public Repository

Package as open-source with comprehensive README and examples

## Testing Your Skill

Before publishing, verify:

1. **Metadata validation**

   - [ ] Name follows format rules
   - [ ] Description is clear and includes when-to-use guidance
   - [ ] No XML tags in YAML

2. **Instructions clarity**

   - [ ] Step-by-step workflows are clear
   - [ ] Examples are concrete and runnable
   - [ ] Error cases are documented

3. **Functionality**

   - [ ] Test main workflow
   - [ ] Test error conditions
   - [ ] Verify output quality

4. **Documentation**
   - [ ] README is comprehensive
   - [ ] Examples work as written
   - [ ] All dependencies documented

## Common Skill Patterns

### Pattern 1: Data Transformation

Transform input data from one format to another:

```
Input → Validate → Transform → Output
```

### Pattern 2: Content Analysis

Analyze content and generate insights:

```
Input → Parse → Analyze → Summarize → Report
```

### Pattern 3: Document Generation

Create new documents from templates and data:

```
Template + Data → Combine → Format → Output
```

### Pattern 4: Workflow Automation

Execute multi-step processes:

```
Trigger → Step 1 → Step 2 → ... → Step N → Complete
```

## Next Steps

1. **Define your Skill's purpose** - What specific capability does it add?
2. **Create SKILL.md** with clear instructions and examples
3. **Organize supporting files** in a logical structure
4. **Test thoroughly** with various inputs
5. **Document everything** for other users
6. **Share responsibly** - secure upload and clear licensing
