# Best Practices for Claude Skill Development

This guide provides proven patterns and anti-patterns for creating effective, maintainable Skills.

## 1. Naming and Discovery

### ✓ DO: Clear, Descriptive Names

```yaml
name: pdf-document-extractor
description: Extract structured data and text from PDF documents.
  Use for form data extraction, text mining, document analysis.
```

- **Hyphenated, lowercase**: Easy to remember and use
- **Descriptive verbs**: extractor, generator, analyzer, converter
- **Specific domain**: Not generic

### ✗ DON'T: Vague or Overly Generic Names

```yaml
name: processor          # Too vague
name: claude-magic      # Reserved word "claude"
name: DoEverything      # Not lowercase
```

## 2. Writing Descriptions That Get Triggered

### The Three-Part Formula

```yaml
description: [Action] [Use Case]. Use when [Trigger Conditions].
```

**Example:**

```yaml
description: Generate Python unit tests from existing code and docstrings.
  Use when the user requests test generation, mentions pytest,
  or needs test coverage for existing functions.
```

### Why This Matters

Claude needs to understand:

1. **What** the Skill does (action)
2. **Why** someone would use it (use case)
3. **When** to trigger it (conditions)

### Real-World Examples

✓ **Good**

```yaml
description: Analyze CSV and Excel files, generate summaries and visualizations.
  Use for data analysis, trend detection, report generation.
```

✗ **Bad**

```yaml
description: Data processor
```

## 3. Instruction Organization

### Recommended Structure

```markdown
# Your Skill Name

## Quick Start

(30 seconds to first success)

## Core Concepts

(Key terminology and mental models)

## Workflows

(Step-by-step procedures)

## Examples

(Real, working examples)

## Advanced Features

(Optional, complex patterns)

## Troubleshooting

(Common issues and solutions)
```

### Why This Order?

1. **Quick Start** hooks immediate interest
2. **Concepts** build mental model
3. **Workflows** provide procedures
4. **Examples** show concrete application
5. **Advanced** for power users
6. **Troubleshooting** prevents frustration

## 4. Writing Clear Workflows

### Anti-Pattern: Too Vague

```markdown
## Process PDF

1. Open the PDF
2. Do stuff
3. Output results
```

**Problems:**

- "Do stuff" is undefined
- No error handling mentioned
- No validation steps

### Pattern: Clear and Actionable

```markdown
## Extracting Text from PDFs

1. **Accept PDF file** from user or context
2. **Validate file exists** - check path and file size
3. **Parse with pdfplumber** - extract text and tables
4. **Validate extraction** - check for empty pages or errors
5. **Format output** - clean whitespace and structure
6. **Report results** - provide extracted content with metadata

### Validation Points

- File exists and is readable
- File size is reasonable (< 100MB)
- Text extraction succeeds
- Output contains expected data
```

**Improvements:**

- Each step is concrete
- Validation points are explicit
- Error handling is mentioned
- Expected inputs/outputs are clear

## 5. Examples: The Good, Bad, and Ugly

### ✗ Bad Example: Too Simple

````markdown
## Example: Create a Template

```python
create_template("email")
```
````

This assumes Claude knows:

- What package to import
- Exact function signature
- What arguments mean
- What the output looks like

````

### Pattern: Complete Working Example

```markdown
## Example: Create Email Template

### Setup
Before using this Skill, ensure you have the template engine ready.

### Step-by-step

1. **Request from user**: "Create a welcome email template"
2. **Create template object**:
   ```python
   from template_engine import EmailTemplate

   template = EmailTemplate(
       name="welcome_email",
       template_type="transactional"
   )
````

3. **Define template content**:

   ```python
   template.add_subject("Welcome to {{company_name}}")
   template.add_body("""
   Dear {{user_name}},

   Welcome to {{company_name}}!
   ...
   """)
   ```

4. **Save template**:
   ```python
   template.save()
   print(f"Template saved: {template.filepath}")
   ```
5. **Verify**: Check template renders correctly with test data

### Complete Code

[Full working example provided]

### Output

The template is now available at `/templates/welcome_email.txt`

````

**Better because:**
- Shows imports
- Includes context (what user asked)
- Step-by-step progression
- Full code blocks
- Expected output shown

## 6. Defensive Programming in Skills

### ✗ Anti-Pattern: Assuming Happy Path

```markdown
## Processing Files

Read the file and process it.
````

**Issues:**

- What if file doesn't exist?
- What if it's corrupted?
- What if it's too large?

### Pattern: Expect Problems

````markdown
## Processing Files Safely

1. **Check file existence**
   ```python
   import os
   if not os.path.exists(filepath):
       raise FileNotFoundError(f"File not found: {filepath}")
   ```
````

2. **Validate file size** (prevent memory issues)

   ```python
   max_size = 100 * 1024 * 1024  # 100MB
   if os.path.getsize(filepath) > max_size:
       raise ValueError(f"File too large: {os.path.getsize(filepath)} bytes")
   ```

3. **Handle encoding issues**

   ```python
   try:
       with open(filepath, 'r', encoding='utf-8') as f:
           content = f.read()
   except UnicodeDecodeError:
       # Try alternative encoding
       with open(filepath, 'r', encoding='latin-1') as f:
           content = f.read()
   ```

4. **Validate content**
   ```python
   if not content or len(content.strip()) == 0:
       raise ValueError("File is empty")
   ```

## 7. Documenting Limitations

### ✗ Optimistic (Problematic)

```markdown
## What This Skill Does

Processes any document format!
```

### Pattern: Honest and Specific

```markdown
## What This Skill Does

✓ **Supports**: PDF, Word (.docx), Excel (.xlsx), plain text
✗ **Does NOT support**: Scanned images, handwritten text, proprietary formats

## Known Limitations

- PDF text extraction only (no image extraction)
- Excel limited to 1 million rows
- No network access for external data
- Requires English language content for some analyses

## When to Use Other Tools

- For scanned PDFs: Use OCR services
- For handwritten documents: Use specialized ML models
- For real-time data: Use live APIs (not available in this environment)
```

## 8. Progressive Content Loading

### Using Reference Files Effectively

```
my-skill/
├── SKILL.md
├── QUICK_START.md          # First 5 minutes
├── REFERENCE.md            # API documentation
├── EXAMPLES/
│   ├── basic_example.md
│   ├── advanced_example.md
│   └── edge_cases.md
└── scripts/
    └── validate.py         # Utility script
```

### In SKILL.md

```markdown
## Examples

For more examples, see [EXAMPLES/](EXAMPLES/):

- [Basic Usage](EXAMPLES/basic_example.md)
- [Advanced Patterns](EXAMPLES/advanced_example.md)
- [Handling Edge Cases](EXAMPLES/edge_cases.md)

## Full API Reference

See [REFERENCE.md](REFERENCE.md) for complete parameter documentation.
```

**Why this matters:**

- Users find what they need quickly
- Additional content loads only when needed
- SKILL.md stays focused
- Reduces token consumption

## 9. Version and Update Management

### Document Version Info

```markdown
---
name: data-analyzer
description: Analyze datasets and generate insights
version: 2.1.0
last_updated: 2024-10-01
---

## Version History

**v2.1.0** (2024-10-01)

- Added support for CSV import
- Fixed pandas memory issues
- Improved chart generation

**v2.0.0** (2024-09-15)

- Major refactor of analysis engine
- Breaking change: Old API no longer supported
```

## 10. Testing Checklist

Before publishing your Skill:

### Metadata

- [ ] Name is lowercase with hyphens only
- [ ] Name doesn't contain "anthropic" or "claude"
- [ ] Description includes both what and when-to-use
- [ ] Description under 1024 characters
- [ ] No XML tags in metadata

### Content Quality

- [ ] Quick start section works (tested)
- [ ] Examples are copy-paste ready
- [ ] All code examples have required imports
- [ ] Error cases are documented
- [ ] Limitations are honest and clear

### Usability

- [ ] Structure follows recommended pattern
- [ ] Clear progression from simple to complex
- [ ] External references are all correct
- [ ] No broken links or file references

### Functionality

- [ ] All scripts are executable
- [ ] Scripts have error handling
- [ ] File paths are handled safely
- [ ] Output format is clear and consistent

## 11. Real-World Skill Examples

### Example 1: Data Analysis Skill

**What works:**

- Clear trigger conditions ("user mentions data analysis")
- Progressive examples (basic → advanced)
- Defensive file handling
- Honest about limitations (CSV up to 1M rows)

### Example 2: Code Generation Skill

**What works:**

- Step-by-step workflow with validation
- Multiple language examples
- Error handling for syntax issues
- Clear output format specification

### Example 3: Document Processing Skill

**What works:**

- Format-specific instructions
- Workflow diagrams
- Fallback strategies
- Memory/performance considerations

## 12. Common Pitfalls to Avoid

| Pitfall                   | Problem                            | Solution                       |
| ------------------------- | ---------------------------------- | ------------------------------ |
| Too generic description   | Claude won't trigger appropriately | Be specific about use cases    |
| Missing examples          | Users don't know how to apply it   | Include 3+ concrete examples   |
| No error handling         | Failures are confusing             | Document validation and errors |
| Assuming dependencies     | Code breaks mysteriously           | Explicitly list all imports    |
| Overly complex            | Users give up                      | Keep quick start under 5 min   |
| No testing before publish | Broken Skill damages reputation    | Test all examples work         |

## Summary: The Skill Quality Checklist

A production-ready Skill has:

✓ **Clear naming** - Descriptive, lowercase, hyphenated
✓ **Focused purpose** - One clear capability
✓ **Discoverable** - When-to-use in description  
✓ **Documented workflows** - Step-by-step procedures
✓ **Working examples** - Copy-paste ready code
✓ **Error handling** - Defensive, validates input
✓ **Honest limitations** - Clear constraints
✓ **Progressive content** - References to detailed docs
✓ **Well-organized** - Logical structure and flow
✓ **Tested** - All examples work as written
