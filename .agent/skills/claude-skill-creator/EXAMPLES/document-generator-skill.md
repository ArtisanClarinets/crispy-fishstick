---
name: report-generator
description: Generate professional reports and documents from templates and data. Use for creating PDF reports, Word documents, formatted summaries, or when the user requests document generation.
---

# Report Generator Skill

Create professional, formatted documents programmatically with templates and data.

## Quick Start

Generate a basic report in minutes:

```python
from datetime import datetime

# Create report content
content = {
    'title': 'Monthly Sales Report',
    'date': datetime.now().strftime('%Y-%m-%d'),
    'total_sales': 150000,
    'regions': ['North', 'South', 'East', 'West']
}

# Build document
report = f"""
# {content['title']}

Generated: {content['date']}

## Summary
Total Sales: ${content['total_sales']:,}

## Regions Covered
"""

for region in content['regions']:
    report += f"- {region}\n"

# Save
with open('report.txt', 'w') as f:
    f.write(report)
```

## Core Concepts

- **Template**: Structure with placeholders for data
- **Data**: Values to insert into template
- **Document**: Final formatted output (TXT, Word, PDF)
- **Metadata**: Title, author, date, etc.

## Workflows

### Basic Report Generation

1. **Gather data** from user or context
2. **Select template** (default or custom)
3. **Merge data into template** - replace placeholders
4. **Format output** - styling, layout, structure
5. **Validate document** - check completeness
6. **Export file** - save in requested format

### Advanced Document Workflow

1. Follow basic steps
2. **Apply styling** - fonts, colors, headers
3. **Add visual elements** - tables, charts, images
4. **Include metadata** - headers, footers, page numbers
5. **Generate index/TOC** for longer documents
6. **Sign/finalize** - watermarks, signatures

## Examples

### Example 1: Text Report

User request: "Create a summary report of this data"

```python
from datetime import datetime

def create_summary_report(data_dict):
    """Generate a formatted text report"""

    lines = []
    lines.append("=" * 60)
    lines.append("REPORT SUMMARY")
    lines.append("=" * 60)
    lines.append(f"Generated: {datetime.now().strftime('%B %d, %Y')}")
    lines.append("")

    # Add sections
    for key, value in data_dict.items():
        lines.append(f"\n{key.upper()}")
        lines.append("-" * len(key))

        if isinstance(value, dict):
            for k, v in value.items():
                lines.append(f"  {k}: {v}")
        elif isinstance(value, list):
            for item in value:
                lines.append(f"  • {item}")
        else:
            lines.append(f"  {value}")

    # Footer
    lines.append("\n" + "=" * 60)
    lines.append("END OF REPORT")
    lines.append("=" * 60)

    return '\n'.join(lines)

# Usage
data = {
    'executive_summary': 'Q3 performance exceeded targets',
    'metrics': {
        'revenue': '$2.5M',
        'growth': '18%',
        'cost_reduction': '12%'
    },
    'key_achievements': [
        'Launched new product line',
        'Expanded to 3 new markets',
        'Improved efficiency by 25%'
    ]
}

report = create_summary_report(data)
with open('summary_report.txt', 'w') as f:
    f.write(report)
```

### Example 2: Formatted Word Document

User request: "Create a Word document with this data"

```python
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def create_word_report(title, data):
    """Create a formatted Word document"""

    doc = Document()

    # Add title
    title_para = doc.add_heading(title, level=1)
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Add content
    for section_title, content in data.items():
        doc.add_heading(section_title, level=2)

        if isinstance(content, list):
            for item in content:
                doc.add_paragraph(item, style='List Bullet')
        elif isinstance(content, dict):
            # Create table
            table = doc.add_table(rows=1, cols=2)
            table.style = 'Light Grid Accent 1'
            hdr_cells = table.rows[0].cells
            hdr_cells[0].text = 'Item'
            hdr_cells[1].text = 'Value'

            for key, value in content.items():
                row_cells = table.add_row().cells
                row_cells[0].text = str(key)
                row_cells[1].text = str(value)
        else:
            doc.add_paragraph(content)

    # Save
    filename = 'report.docx'
    doc.save(filename)
    return filename

# Usage
data = {
    'Overview': 'Quarterly performance summary',
    'Metrics': {
        'Revenue': '$2.5M',
        'Growth': '18%',
        'ROI': '215%'
    },
    'Achievements': [
        'Product launch successful',
        'Team expanded to 50 members',
        'Market share increased 5%'
    ]
}

create_word_report('Q3 Performance Report', data)
```

### Example 3: Markdown Report

User request: "Generate a Markdown report I can publish"

```python
from datetime import datetime

def create_markdown_report(title, data):
    """Create a Markdown formatted report"""

    lines = []

    # Header
    lines.append(f"# {title}")
    lines.append(f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*")
    lines.append("")

    # Table of contents
    lines.append("## Contents")
    for section in data.keys():
        lines.append(f"- [{section}](#{section.lower().replace(' ', '-')})")
    lines.append("")

    # Sections
    for section, content in data.items():
        lines.append(f"## {section}")
        lines.append("")

        if isinstance(content, str):
            lines.append(content)
        elif isinstance(content, list):
            for item in content:
                lines.append(f"- {item}")
        elif isinstance(content, dict):
            for key, value in content.items():
                lines.append(f"**{key}**: {value}")

        lines.append("")

    # Footer
    lines.append("---")
    lines.append("*This report was automatically generated.*")

    return '\n'.join(lines)

# Usage
content = {
    'Summary': 'Quarterly business review',
    'Performance': {
        'Revenue': '$2.5M (↑18%)',
        'Growth': 'Above target',
        'Efficiency': '+25%'
    },
    'Highlights': [
        'Launched Product v2.0',
        'Entered European market',
        'Achieved ISO certification'
    ],
    'Next Quarter': 'Focus on scaling operations'
}

report_md = create_markdown_report('Q3 Business Review', content)
with open('report.md', 'w') as f:
    f.write(report_md)
```

## Common Patterns

### Pattern 1: Template System

```python
# Define templates
TEMPLATES = {
    'executive_summary': """
EXECUTIVE SUMMARY
Generated: {date}

Title: {title}
Status: {status}

Key Metrics:
- Revenue: {revenue}
- Growth: {growth}

Summary: {summary}
""",

    'detailed_report': """
DETAILED REPORT
Date: {date}

{title}

Overview:
{overview}

Details:
{details}

Conclusion:
{conclusion}
"""
}

# Use template
template = TEMPLATES['executive_summary']
report = template.format(
    date='2024-10-01',
    title='Q3 Report',
    status='Complete',
    revenue='$2.5M',
    growth='18%',
    summary='Strong performance across all metrics'
)
```

### Pattern 2: Data Validation

```python
def validate_report_data(data):
    """Ensure data meets requirements"""

    required = ['title', 'date', 'summary']

    for field in required:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

    # Type checks
    if not isinstance(data['title'], str):
        raise TypeError("Title must be string")

    if len(data['title']) == 0:
        raise ValueError("Title cannot be empty")

    return True
```

### Pattern 3: Error Recovery

```python
def safe_document_creation(data, fallback_path='default_report.txt'):
    """Create document with fallback"""

    try:
        # Try primary format
        from docx import Document
        return create_word_report(data)

    except ImportError:
        # Fallback to text
        print("Word format not available, using text")
        with open(fallback_path, 'w') as f:
            f.write(str(data))
        return fallback_path

    except Exception as e:
        # Final fallback
        print(f"Error: {e}")
        return None
```

## Available Document Formats

### Text (.txt)

- ✓ Simple, compatible everywhere
- ✓ Good for basic reports
- ✗ Limited formatting

### Markdown (.md)

- ✓ Formatted text, publishes well
- ✓ Easy to read as source
- ✓ Good for technical docs

### Word (.docx)

- ✓ Professional formatting
- ✓ Tables, styles, rich content
- ✓ Easy to edit after generation

### PDF

- ✓ Final delivery format
- ✓ Looks the same everywhere
- ✗ Requires additional library

## Tools and Techniques

### Available Libraries

- **python-docx**: Create Word documents
- **reportlab**: Generate PDF documents
- **markdown**: Convert Markdown to HTML
- **jinja2**: Template rendering (if available)

### Common Operations

```python
# Text manipulation
text.upper()
text.replace('old', 'new')
'\n'.join(lines)

# Formatting
f"{value:,.2f}"  # Currency
f"{value:.1%}"   # Percentage
f"{date:%Y-%m-%d}"  # Date

# File operations
with open(filename, 'w') as f:
    f.write(content)
```

## Limitations

✗ **Does NOT support**:

- Scanned images in documents
- External font installation
- Complex graphics
- Real-time document editing
- Network-based templates

✓ **Optimal for**:

- Text-based reports
- Document templates
- Batch report generation
- Professional formatting
- Automation workflows

## Testing Your Document

Before delivering:

- [ ] Document opens in target application
- [ ] All data populated correctly
- [ ] Formatting looks professional
- [ ] No corruption or errors
- [ ] File size is reasonable
- [ ] Metadata is correct (author, date)

## Advanced Features

### Multi-Page Reports

```python
def create_multi_page_report(sections):
    from docx import Document
    doc = Document()

    for title, content in sections.items():
        doc.add_page_break()
        doc.add_heading(title, level=1)
        doc.add_paragraph(content)

    doc.save('report.docx')
```

### Dynamic Table Generation

```python
def create_data_table(headers, rows):
    from docx import Document
    doc = Document()

    table = doc.add_table(rows=len(rows)+1, cols=len(headers))

    # Headers
    for i, header in enumerate(headers):
        table.rows[0].cells[i].text = header

    # Data
    for row_idx, row_data in enumerate(rows, 1):
        for col_idx, value in enumerate(row_data):
            table.rows[row_idx].cells[col_idx].text = str(value)

    doc.save('data_table.docx')
```
