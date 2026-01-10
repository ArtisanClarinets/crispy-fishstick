---
name: data-analyzer
description: Analyze CSV and Excel files, generate summaries, and visualize trends. Use for data analysis, trend detection, statistical summary generation, or when the user requests data insights.
---

# Data Analyzer Skill

Transform raw data into actionable insights with automated analysis and visualization.

## Quick Start

Process a CSV file in seconds:

```python
import pandas as pd

# Load data
df = pd.read_csv('data.csv')

# Generate summary
print(df.describe())

# Show column info
print(df.info())
```

## Core Concepts

- **Dataset**: CSV or Excel file with tabular data
- **Summary Statistics**: Count, mean, std dev, min, max, quartiles
- **Trend**: Pattern or direction in data over time
- **Correlation**: Relationship between variables

## Workflows

### Basic Analysis Workflow

1. **Accept input file** from user or context
2. **Validate file** - check format and size
3. **Load data** using pandas
4. **Explore structure** - columns, types, missing values
5. **Calculate statistics** - basic summary metrics
6. **Report findings** - clear, actionable insights

### Advanced Analysis Workflow

1. Follow basic workflow steps
2. **Calculate correlations** between numeric columns
3. **Identify outliers** using statistical methods
4. **Generate visualizations** using matplotlib
5. **Trend analysis** for time series data
6. **Export results** in user's preferred format

## Examples

### Example 1: Quick CSV Analysis

User request: "Analyze this sales data and tell me the summary"

```python
import pandas as pd

# Load the CSV
df = pd.read_csv('sales_data.csv')

# Get summary statistics
summary = df.describe()
print("Data Summary:")
print(summary)

# Check for missing values
print("\nMissing Values:")
print(df.isnull().sum())

# Show data types
print("\nData Types:")
print(df.dtypes)
```

**Output:**

- Summary statistics for all numeric columns
- Report of any missing data
- Data type information

### Example 2: Correlation Analysis

User request: "Find which factors correlate with sales"

```python
import pandas as pd

# Load data
df = pd.read_csv('sales_data.csv')

# Calculate correlations with sales column
correlations = df.corr()['sales'].sort_values(ascending=False)

print("Factors Correlated with Sales:")
for factor, correlation in correlations.items():
    if factor != 'sales':
        print(f"  {factor}: {correlation:.3f}")
```

**Output:**

- Ranked list of factors by correlation strength
- Helps identify key drivers

### Example 3: Time Series Trend

User request: "Show me the trend in monthly revenue"

```python
import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('monthly_revenue.csv')
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')

# Plot trend
plt.figure(figsize=(10, 6))
plt.plot(df['date'], df['revenue'], marker='o')
plt.title('Monthly Revenue Trend')
plt.xlabel('Date')
plt.ylabel('Revenue')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('revenue_trend.png', dpi=100)

# Calculate trend
print(f"Average: ${df['revenue'].mean():,.0f}")
print(f"Min: ${df['revenue'].min():,.0f}")
print(f"Max: ${df['revenue'].max():,.0f}")
print(f"Growth: {((df['revenue'].iloc[-1] / df['revenue'].iloc[0]) - 1) * 100:.1f}%")
```

**Output:**

- Chart saved as PNG
- Key statistics including growth rate

## Common Patterns

### Pattern 1: Validate Input

```python
import os
import pandas as pd

def validate_and_load(filepath):
    # Check file exists
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"File not found: {filepath}")

    # Check file size (prevent memory issues)
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    if size_mb > 100:
        raise ValueError(f"File too large: {size_mb:.1f}MB")

    # Try loading
    try:
        df = pd.read_csv(filepath)
    except Exception as e:
        raise ValueError(f"Cannot read file: {e}")

    # Check not empty
    if df.empty:
        raise ValueError("File is empty")

    return df
```

### Pattern 2: Handle Missing Data

```python
import pandas as pd

df = pd.read_csv('data.csv')

# Report missing data
missing = df.isnull().sum()
if missing.any():
    print("Missing values found:")
    print(missing[missing > 0])

# Option 1: Drop rows with missing data
df_clean = df.dropna()

# Option 2: Fill with mean (numeric columns only)
df_clean = df.fillna(df.mean(numeric_only=True))

# Option 3: Drop columns with too many missing
df_clean = df.dropna(thresh=len(df) * 0.8, axis=1)
```

### Pattern 3: Generate Report

```python
import pandas as pd
from datetime import datetime

def generate_report(df, filename):
    report = []
    report.append(f"Data Analysis Report - {datetime.now().strftime('%Y-%m-%d')}")
    report.append("=" * 50)
    report.append(f"\nDataset: {len(df)} rows, {len(df.columns)} columns")
    report.append("\nColumn Summary:")

    for col in df.columns:
        report.append(f"  - {col}: {df[col].dtype}")

    report.append("\nStatistics:")
    report.append(df.describe().to_string())

    # Save report
    with open(filename, 'w') as f:
        f.write('\n'.join(report))

    return filename
```

## Tools and Techniques

### Available Libraries

- **pandas**: Data manipulation and analysis
- **numpy**: Numerical operations
- **matplotlib**: Visualization
- **scipy**: Statistical analysis
- **scikit-learn**: Machine learning (for advanced analysis)

### Common Operations

```python
# Load data
df = pd.read_csv('file.csv')
df = pd.read_excel('file.xlsx')

# Explore
df.head()           # First 5 rows
df.info()           # Data types and nulls
df.describe()       # Statistics

# Filter
df[df['column'] > 100]
df.query('column > 100')

# Group
df.groupby('category').sum()

# Visualize
df.plot(kind='bar')
df.plot(kind='line')
df.plot(kind='scatter', x='col1', y='col2')
```

## Limitations

✗ **Does NOT support**:

- Scanned PDF documents (no OCR)
- Network data fetching
- Real-time streaming data
- Files over 100MB
- More than 1 million rows

✓ **Optimal for**:

- CSV files under 100MB
- Excel workbooks
- Structured tabular data
- Statistical analysis
- Trend visualization

## Error Handling

### Common Issues and Solutions

**Issue**: "No columns to parse from file"
**Solution**: Verify file is valid CSV/Excel and has headers

**Issue**: "Cannot convert to numeric"
**Solution**: Check data types; non-numeric columns should be string/category

**Issue**: "MemoryError"
**Solution**: File too large; consider processing in chunks or filtering data

**Issue**: "No module named 'matplotlib'"
**Solution**: This shouldn't happen; matplotlib is pre-installed

## Advanced Features

### Outlier Detection

```python
import pandas as pd
import numpy as np

def find_outliers(df, column, threshold=3):
    z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
    outliers = df[z_scores > threshold]
    return outliers
```

### Correlation Heatmap

```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def correlation_heatmap(df):
    corr = df.corr(numeric_only=True)

    plt.figure(figsize=(10, 8))
    plt.imshow(corr, cmap='coolwarm', vmin=-1, vmax=1)
    plt.colorbar()
    plt.xticks(range(len(corr.columns)), corr.columns, rotation=45)
    plt.yticks(range(len(corr.columns)), corr.columns)
    plt.title('Correlation Matrix')
    plt.tight_layout()
    plt.savefig('correlation_heatmap.png')
```

## Testing Your Analysis

Before sharing results:

- [ ] Data loaded successfully
- [ ] No unexpected NaN values
- [ ] Summary statistics look reasonable
- [ ] Visualizations are clear
- [ ] Conclusions match the data
- [ ] Results reproducible with same input
