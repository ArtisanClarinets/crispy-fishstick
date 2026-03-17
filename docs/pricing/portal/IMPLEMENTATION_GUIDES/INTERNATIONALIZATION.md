# Vantus Client Portal - Internationalization (i18n) Specification

## Document Information

| Property             | Value                         |
| -------------------- | ----------------------------- |
| **Document Version** | 1.0.0                         |
| **Last Updated**     | 2026-02-22                    |
| **Owner**            | Engineering Architecture Team |
| **Status**           | Approved                      |
| **Review Cycle**     | Quarterly                     |

---

## Table of Contents

1. [Supported Languages](#1-supported-languages)
2. [Text Direction Support](#2-text-direction-support)
3. [Date and Time Formatting](#3-date-and-time-formatting)
4. [Number Formatting](#4-number-formatting)
5. [Currency Support](#5-currency-support)
6. [Text Expansion Considerations](#6-text-expansion-considerations)
7. [Collation and Sorting](#7-collation-and-sorting)
8. [Pluralization Rules](#8-pluralization-rules)
9. [Accessibility in i18n](#9-accessibility-in-i18n)
10. [Implementation Architecture](#10-implementation-architecture)
11. [Content Localization](#11-content-localization)
12. [Testing Requirements](#12-testing-requirements)

---

## 1. Supported Languages

### 1.1 Language Tier Structure

The Vantus Client Portal implements a tiered language support model based on market priority and user base:

#### Tier 1: Complete Support (Enterprise Priority)

| Language   | Code | Region         | Coverage Target | Notes                                        |
| ---------- | ---- | -------------- | --------------- | -------------------------------------------- |
| English    | `en` | US, GB, AU, CA | 100%            | Source language                              |
| Spanish    | `es` | ES, MX, AR, CO | 100%            | European + Latin American variants           |
| French     | `fr` | FR, CA, BE     | 100%            | European + Canadian variants                 |
| German     | `de` | DE, AT, CH     | 100%            | Formal address (Sie) default                 |
| Portuguese | `pt` | PT, BR         | 100%            | European + Brazilian variants                |
| Japanese   | `ja` | JP             | 100%            | Keigo honorifics for enterprise              |
| Chinese    | `zh` | CN, TW, HK     | 100%            | Simplified (zh-Hans) + Traditional (zh-Hant) |
| Korean     | `ko` | KR             | 100%            | Business formal level                        |
| Arabic     | `ar` | SA, AE, EG     | 100%            | Modern Standard Arabic                       |
| Hindi      | `hi` | IN             | 100%            | Devanagari script                            |

**Tier 1 Requirements:**

- 100% UI translation coverage
- Full legal document localization
- Localized customer support content
- Region-specific compliance text
- Localized email templates
- SEO-optimized localized landing pages

#### Tier 2: Partial Support (Growth Markets)

| Language   | Code | Region | Coverage Target | Priority Features            |
| ---------- | ---- | ------ | --------------- | ---------------------------- |
| Italian    | `it` | IT, CH | 85%             | Core UI, Dashboard, Settings |
| Dutch      | `nl` | NL, BE | 85%             | Core UI, Dashboard, Settings |
| Polish     | `pl` | PL     | 80%             | Core UI, Dashboard           |
| Russian    | `ru` | RU     | 80%             | Core UI, Dashboard           |
| Turkish    | `tr` | TR     | 75%             | Core UI only                 |
| Vietnamese | `vi` | VN     | 75%             | Core UI only                 |
| Thai       | `th` | TH     | 75%             | Core UI only                 |
| Indonesian | `id` | ID     | 75%             | Core UI only                 |

**Tier 2 Requirements:**

- Core user interface (dashboard, navigation, settings)
- Critical error messages and notifications
- Essential help documentation
- Email notifications for key events
- English fallback for uncovered content

#### Tier 3: Community Support (Future Expansion)

| Language  | Code  | Status  | Community Lead |
| --------- | ----- | ------- | -------------- |
| Hebrew    | `he`  | Planned | Community      |
| Swedish   | `sv`  | Planned | Community      |
| Norwegian | `no`  | Planned | Community      |
| Danish    | `da`  | Planned | Community      |
| Finnish   | `fi`  | Planned | Community      |
| Czech     | `cs`  | Planned | Community      |
| Greek     | `el`  | Planned | Community      |
| Romanian  | `ro`  | Planned | Community      |
| Hungarian | `hu`  | Planned | Community      |
| Ukrainian | `uk`  | Planned | Community      |
| Malay     | `ms`  | Planned | Community      |
| Filipino  | `fil` | Planned | Community      |

**Tier 3 Requirements:**

- Community-contributed translations
- Core UI only
- No guaranteed update cadence
- English fallback for all non-translated content

### 1.2 Language Code Standards

**BCP 47 Language Tags**

All language codes MUST conform to [BCP 47](https://tools.ietf.org/html/bcp47) standards:

```
Format: language[-script][-region][-variant]

Examples:
- en (English - default)
- en-US (English - United States)
- en-GB (English - United Kingdom)
- zh-Hans (Chinese - Simplified)
- zh-Hant (Chinese - Traditional)
- zh-Hans-CN (Chinese - Simplified - China)
- pt-BR (Portuguese - Brazil)
- pt-PT (Portuguese - Portugal)
```

**Implementation Rules:**

1. Always use full locale codes in translation files, for example en-US rather than a generic en file.
2. Implement fallback chains: `pt-BR` → `pt` → `en-US`
3. Store user preference with region: `navigator.language` or user selection
4. Default locale: `en-US`

### 1.3 Locale Fallback Chain

```typescript
// Fallback configuration
const i18nConfig = {
  fallbackLng: {
    "zh-Hans": ["zh", "en"],
    "zh-Hant": ["zh", "en"],
    "pt-BR": ["pt", "en"],
    "pt-PT": ["pt", "en"],
    "es-MX": ["es", "en"],
    "es-AR": ["es", "en"],
    "fr-CA": ["fr", "en"],
    default: ["en"],
  },
  // Detection order
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["cookie", "localStorage"],
  },
};
```

---

## 2. Text Direction Support

### 2.1 Direction Categories

| Direction | Languages                                                                                                                                              | CSS Value             | Implementation            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ------------------------- |
| LTR       | English, Spanish, French, German, Portuguese, Japanese, Chinese, Korean, Hindi, Italian, Dutch, Polish, Russian, Turkish, Vietnamese, Thai, Indonesian | `direction: ltr`      | Default                   |
| RTL       | Arabic, Hebrew, Persian, Urdu                                                                                                                          | `direction: rtl`      | Special handling required |
| Mixed     | All (when embedding foreign text)                                                                                                                      | `unicode-bidi: embed` | Bidirectional algorithm   |

### 2.2 RTL Implementation Strategy

#### 2.2.1 CSS Logical Properties

**MANDATORY:** Use CSS logical properties instead of physical properties:

```css
/* ❌ INCORRECT - Physical properties */
.element {
  margin-left: 16px;
  margin-right: 8px;
  text-align: left;
  border-left: 2px solid blue;
  border-top-left-radius: 4px;
}

/* ✅ CORRECT - Logical properties */
.element {
  margin-inline-start: 16px;
  margin-inline-end: 8px;
  text-align: start;
  border-inline-start: 2px solid blue;
  border-start-start-radius: 4px;
}
```

**Logical Property Mapping:**

| Physical                 | Logical                     | Description               |
| ------------------------ | --------------------------- | ------------------------- |
| `left`                   | `inline-start`              | Start of inline axis      |
| `right`                  | `inline-end`                | End of inline axis        |
| `top`                    | `block-start`               | Start of block axis       |
| `bottom`                 | `block-end`                 | End of block axis         |
| `width`                  | `inline-size`               | Size in inline direction  |
| `height`                 | `block-size`                | Size in block direction   |
| `margin-left`            | `margin-inline-start`       | Margin at inline start    |
| `margin-right`           | `margin-inline-end`         | Margin at inline end      |
| `padding-left`           | `padding-inline-start`      | Padding at inline start   |
| `border-left`            | `border-inline-start`       | Border at inline start    |
| `text-align: left`       | `text-align: start`         | Text alignment start      |
| `border-top-left-radius` | `border-start-start-radius` | Start-start corner radius |

#### 2.2.2 HTML Direction Attribute

```typescript
// React Hook for RTL management
const useTextDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = ["ar", "he", "fa", "ur"].includes(i18n.language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return { isRTL };
};
```

#### 2.2.3 Component-Level RTL Support

```typescript
// Utility for RTL-aware styling
import { useTranslation } from "react-i18next";

export const useRTL = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return {
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
    // Utility for conditionally applying classes
    className: (ltrClass: string, rtlClass: string) =>
      isRTL ? rtlClass : ltrClass,
    // Utility for flipping transforms
    transform: (value: string) => (isRTL ? `scaleX(-1) ${value}` : value),
  };
};
```

#### 2.2.4 Icon Direction Handling

```typescript
// Icons that should be mirrored in RTL
const MIRROR_ICONS = [
  'arrow-left', 'arrow-right',
  'chevron-left', 'chevron-right',
  'arrow-back', 'arrow-forward',
  'first-page', 'last-page',
  'navigate-before', 'navigate-next',
  'reply', 'forward',
  'undo', 'redo',
  'exit-to-app', 'open-in-new',
];

// Icons that should NOT be mirrored
const NO_MIRROR_ICONS = [
  'logo', 'brand',
  'photo', 'image',
  'videocam', 'mic',
  'check', 'close',
  'search', 'settings',
];

// React component
const Icon = ({ name, ...props }: IconProps) => {
  const { isRTL } = useRTL();
  const shouldMirror = isRTL && MIRROR_ICONS.includes(name);

  return (
    <svg
      {...props}
      style={{
        ...props.style,
        transform: shouldMirror ? 'scaleX(-1)' : undefined,
      }}
    >
      {/* Icon paths */}
    </svg>
  );
};
```

### 2.3 Bidirectional Text Handling

#### 2.3.1 Unicode Directional Markers

```typescript
// Unicode characters for bidirectional control
const UNICODE = {
  // Left-to-Right Mark
  LRM: '\u200E',
  // Right-to-Left Mark
  RL M: '\u200F',
  // Left-to-Right Embed
  LRE: '\u202A',
  // Right-to-Left Embed
  RLE: '\u202B',
  // Pop Directional Formatting
  PDF: '\u202C',
  // Left-to-Right Override
  LRO: '\u202D',
  // Right-to-Left Override
  RLO: '\u202E',
  // First Strong Isolate
  FSI: '\u2068',
  // Left-to-Right Isolate
  LRI: '\u2066',
  // Right-to-Left Isolate
  RLI: '\u2067',
  // Pop Directional Isolate
  PDI: '\u2069',
};

// Wrapper for LTR text in RTL context
export const wrapLTR = (text: string): string =>
  `${UNICODE.LRI}${text}${UNICODE.PDI}`;

// Wrapper for RTL text in LTR context
export const wrapRTL = (text: string): string =>
  `${UNICODE.RLI}${text}${UNICODE.PDI}`;

// Safe display of mixed content
export const MixedText = ({ text }: { text: string }) => {
  // Automatically wrap based on character detection
  const processed = text.split(/(\s+)/).map((segment) => {
    if (/[\u0600-\u06FF]/.test(segment)) {
      // Contains Arabic characters
      return wrapRTL(segment);
    }
    return segment;
  }).join('');

  return <span>{processed}</span>;
};
```

#### 2.3.2 CSS for Bidirectional Text

```css
/* Base bidirectional support */
.bidi-text {
  unicode-bidi: plaintext;
  direction: ltr; /* Default, will be overridden by dir attribute */
}

/* Isolate embedded content */
.bidi-isolate {
  unicode-bidi: isolate;
}

/* Email addresses, URLs - always LTR */
.ltr-override {
  direction: ltr;
  unicode-bidi: embed;
}

/* Phone numbers - always LTR */
.phone-number {
  direction: ltr;
  unicode-bidi: plaintext;
  text-align: start;
}
```

### 2.4 Layout Mirroring Guidelines

#### 2.4.1 Components Requiring Mirroring

| Component     | LTR Behavior          | RTL Behavior          |
| ------------- | --------------------- | --------------------- |
| Navigation    | Logo left, menu right | Logo right, menu left |
| Sidebar       | Left side             | Right side            |
| Back Button   | Left arrow            | Right arrow           |
| Progress Bar  | Left to right         | Right to left         |
| Timeline      | Left to right         | Right to left         |
| Slider/Range  | Min left, max right   | Min right, max left   |
| Pagination    | 1 2 3 ... →           | ← ... 3 2 1           |
| Charts/Graphs | X-axis left to right  | X-axis right to left  |

#### 2.4.2 Components NOT Requiring Mirroring

| Component                   | Reason                       |
| --------------------------- | ---------------------------- |
| Video player controls       | Industry standard (LTR)      |
| Clock/analog time           | Clockwise is universal       |
| Musical notation            | Standard is LTR              |
| Charts with geographic data | Maps maintain orientation    |
| Brand logos                 | Must maintain brand identity |
| Diagrams with arrows        | Context-dependent            |

---

## 3. Date and Time Formatting

### 3.1 Date Format Standards

#### 3.1.1 Format Categories

| Category | Description      | Example (en-US)             | Example (de)              |
| -------- | ---------------- | --------------------------- | ------------------------- |
| `short`  | Numeric, compact | 2/22/26                     | 22.02.26                  |
| `medium` | Short month name | Feb 22, 2026                | 22. Feb. 2026             |
| `long`   | Full month name  | February 22, 2026           | 22. Februar 2026          |
| `full`   | With weekday     | Saturday, February 22, 2026 | Samstag, 22. Februar 2026 |

#### 3.1.2 Locale-Specific Date Formats

```typescript
const DATE_FORMATS: Record<string, Record<string, string>> = {
  "en-US": {
    short: "M/d/yy",
    medium: "MMM d, y",
    long: "MMMM d, y",
    full: "EEEE, MMMM d, y",
  },
  "en-GB": {
    short: "dd/MM/y",
    medium: "d MMM y",
    long: "d MMMM y",
    full: "EEEE, d MMMM y",
  },
  de: {
    short: "dd.MM.yy",
    medium: "dd. MMM. y",
    long: "dd. MMMM y",
    full: "EEEE, dd. MMMM y",
  },
  ja: {
    short: "y/MM/dd",
    medium: "y年M月d日",
    long: "y年M月d日",
    full: "y年M月d日(EEEE)",
  },
  "zh-Hans": {
    short: "yy/M/d",
    medium: "y年M月d日",
    long: "y年M月d日",
    full: "y年M月d日 EEEE",
  },
  ar: {
    short: "d/M/yy",
    medium: "d MMM y",
    long: "d MMMM y",
    full: "EEEE، d MMMM y",
  },
};
```

### 3.2 Time Format Standards

#### 3.2.1 12-Hour vs 24-Hour Clocks

| Locale  | Format  | Example | Pattern  |
| ------- | ------- | ------- | -------- |
| `en-US` | 12-hour | 3:30 PM | `h:mm a` |
| `en-GB` | 24-hour | 15:30   | `HH:mm`  |
| `de`    | 24-hour | 15:30   | `HH:mm`  |
| `ja`    | 24-hour | 15:30   | `HH:mm`  |
| `ar`    | 12-hour | ٣:٣٠ م  | `h:mm a` |

```typescript
// Time formatting utility
export const formatTime = (
  date: Date,
  locale: string,
  options: { hour12?: boolean; includeSeconds?: boolean } = {},
): string => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    ...(options.includeSeconds && { second: "2-digit" }),
    ...(options.hour12 !== undefined && { hour12: options.hour12 }),
  };

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
};

// Force 24-hour format
export const formatTime24h = (date: Date, locale: string): string =>
  formatTime(date, locale, { hour12: false });

// Force 12-hour format
export const formatTime12h = (date: Date, locale: string): string =>
  formatTime(date, locale, { hour12: true });
```

### 3.3 Combined DateTime Formatting

```typescript
export const formatDateTime = (
  date: Date,
  locale: string,
  style: "short" | "medium" | "long" | "full" = "medium",
): string => {
  const presets: Record<string, Intl.DateTimeFormatOptions> = {
    short: {
      dateStyle: "short",
      timeStyle: "short",
    },
    medium: {
      dateStyle: "medium",
      timeStyle: "short",
    },
    long: {
      dateStyle: "long",
      timeStyle: "short",
    },
    full: {
      dateStyle: "full",
      timeStyle: "medium",
    },
  };

  return new Intl.DateTimeFormat(locale, presets[style]).format(date);
};
```

### 3.4 Timezone Handling

#### 3.4.1 Timezone Display Strategy

```typescript
// Timezone configuration
interface TimezoneConfig {
  // User's preferred timezone
  userTimezone: string;
  // System default (UTC)
  systemTimezone: "UTC";
  // Format for display
  displayFormat: "offset" | "name" | "abbreviation";
}

// Format timezone for display
export const formatTimezone = (
  timezone: string,
  locale: string,
  style: "short" | "long" = "short",
): string => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: style,
  });

  const parts = formatter.formatToParts(date);
  const tzPart = parts.find((p) => p.type === "timeZoneName");
  return tzPart?.value || timezone;
};

// Get UTC offset string
export const getUTCOffset = (timezone: string): string => {
  const date = new Date();
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);

  const sign = offset >= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset));
  const minutes = Math.abs((offset % 1) * 60);

  return minutes > 0
    ? `UTC${sign}${hours}:${minutes.toString().padStart(2, "0")}`
    : `UTC${sign}${hours}`;
};
```

#### 3.4.2 Timezone-Aware Components

```typescript
// React component for timezone display
interface DateTimeDisplayProps {
  date: Date | string;
  locale: string;
  userTimezone: string;
  showTimezone?: boolean;
  style?: 'short' | 'medium' | 'long' | 'full';
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  date,
  locale,
  userTimezone,
  showTimezone = true,
  style = 'medium',
}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: style,
    timeStyle: style === 'full' ? 'medium' : 'short',
    timeZone: userTimezone,
  }).format(dateObj);

  const tzName = showTimezone
    ? formatTimezone(userTimezone, locale, 'short')
    : null;

  return (
    <span title={dateObj.toISOString()}>
      {formatted}
      {tzName && <span className="timezone"> ({tzName})</span>}
    </span>
  );
};
```

### 3.5 Relative Time Formatting

```typescript
// Relative time formatter using Intl.RelativeTimeFormat
export class RelativeTimeFormatter {
  private formatter: Intl.RelativeTimeFormat;

  constructor(locale: string, options?: Intl.RelativeTimeFormatOptions) {
    this.formatter = new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
      style: "long",
      ...options,
    });
  }

  format(date: Date, reference: Date = new Date()): string {
    const diff = date.getTime() - reference.getTime();
    const absDiff = Math.abs(diff);
    const isPast = diff < 0;

    // Determine appropriate unit
    const units: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
      { unit: "second", ms: 1000 },
      { unit: "minute", ms: 60 * 1000 },
      { unit: "hour", ms: 60 * 60 * 1000 },
      { unit: "day", ms: 24 * 60 * 60 * 1000 },
      { unit: "week", ms: 7 * 24 * 60 * 60 * 1000 },
      { unit: "month", ms: 30 * 24 * 60 * 60 * 1000 },
      { unit: "year", ms: 365 * 24 * 60 * 60 * 1000 },
    ];

    // Find appropriate unit
    for (let i = units.length - 1; i >= 0; i--) {
      const { unit, ms } = units[i];
      const value = Math.floor(absDiff / ms);

      if (value >= 1 || i === 0) {
        return this.formatter.format(isPast ? -value : value, unit);
      }
    }

    return this.formatter.format(0, "second");
  }
}

// Usage examples:
// en: "2 hours ago", "in 3 days", "yesterday", "tomorrow"
// de: "vor 2 Stunden", "in 3 Tagen", "gestern", "morgen"
// ja: "2時間前", "3日後", "昨日", "明日"
```

### 3.6 Calendar Systems

#### 3.6.1 Supported Calendar Systems

| Calendar              | Locales    | Use Case           | Notes                      |
| --------------------- | ---------- | ------------------ | -------------------------- |
| Gregorian             | All        | Default            | ISO 8601 compliant         |
| Islamic (Hijri)       | ar, fa, ur | Religious dates    | Umm al-Qura variant for SA |
| Buddhist              | th         | Thai official      | BE = CE + 543              |
| Japanese              | ja         | Official documents | Era-based (Reiwa, etc.)    |
| Chinese Lunar         | zh-Hant    | Traditional        | For holidays               |
| Persian (Solar Hijri) | fa         | Iran official      | Jalali calendar            |

#### 3.6.2 Calendar Display Implementation

```typescript
// Multi-calendar date display
export const formatWithCalendar = (
  date: Date,
  locale: string,
  calendar: 'gregory' | 'islamic' | 'buddhist' | 'japanese' | 'persian'
): string => {
  const calendarMap: Record<string, string> = {
    gregory: 'gregory',
    islamic: 'islamic-umalqura',
    buddhist: 'buddhist',
    japanese: 'japanese',
    persian: 'persian',
  };

  return new Intl.DateTimeFormat(locale, {
    calendar: calendarMap[calendar],
    dateStyle: 'full',
  }).format(date);
};

// Display both Gregorian and local calendar
export const DualCalendarDisplay: React.FC<{
  date: Date;
  locale: string;
  showLocalCalendar?: boolean;
}> = ({ date, locale, showLocalCalendar = true }) => {
  const calendar = getPreferredCalendar(locale);

  return (
    <div className="dual-calendar">
      <div className="gregorian">
        {formatDateTime(date, locale, 'full')}
      </div>
      {showLocalCalendar && calendar !== 'gregory' && (
        <div className="local-calendar">
          {formatWithCalendar(date, locale, calendar)}
        </div>
      )}
    </div>
  );
};

const getPreferredCalendar = (locale: string): string => {
  const calendarMap: Record<string, string> = {
    'th': 'buddhist',
    'ja': 'japanese',
    'ar': 'islamic',
    'fa': 'persian',
  };
  return calendarMap[locale.split('-')[0]] || 'gregory';
};
```

---

## 4. Number Formatting

### 4.1 Locale-Aware Number Formatting

#### 4.1.1 Decimal Separators by Locale

| Locale  | Decimal Separator    | Thousands Separator    | Example  |
| ------- | -------------------- | ---------------------- | -------- |
| `en-US` | `.` (period)         | `,` (comma)            | 1,234.56 |
| `de`    | `,` (comma)          | `.` (period)           | 1.234,56 |
| `fr`    | `,` (comma)          | ` ` (space)            | 1 234,56 |
| `es`    | `,` (comma)          | `.` (period)           | 1.234,56 |
| `it`    | `,` (comma)          | `.` (period)           | 1.234,56 |
| `ja`    | `.` (period)         | `,` (comma)            | 1,234.56 |
| `zh`    | `.` (period)         | `,` (comma)            | 1,234.56 |
| `ar`    | `٫` (Arabic decimal) | `٬` (Arabic thousands) | ١٬٢٣٤٫٥٦ |
| `hi`    | `.` (period)         | `,` (comma)            | 1,234.56 |

#### 4.1.2 Number Format Implementation

```typescript
// Core number formatting
export class NumberFormatter {
  private locale: string;

  constructor(locale: string) {
    this.locale = locale;
  }

  format(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(value);
  }

  // Integer formatting
  formatInteger(value: number): string {
    return this.format(value, {
      maximumFractionDigits: 0,
    });
  }

  // Decimal formatting with configurable precision
  formatDecimal(value: number, minDecimals = 0, maxDecimals = 2): string {
    return this.format(value, {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    });
  }

  // Compact notation (K, M, B, T)
  formatCompact(value: number): string {
    return this.format(value, {
      notation: "compact",
      compactDisplay: "short",
    });
  }

  // Scientific notation
  formatScientific(value: number, decimals = 2): string {
    return this.format(value, {
      notation: "scientific",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // Engineering notation
  formatEngineering(value: number): string {
    return this.format(value, {
      notation: "engineering",
    });
  }
}
```

### 4.2 Percentage Formatting

```typescript
// Percentage formatting with locale awareness
export const formatPercent = (
  value: number, // 0.15 = 15%
  locale: string,
  options: {
    decimals?: number;
    style?: "symbol" | "words";
  } = {},
): string => {
  const { decimals = 0, style = "symbol" } = options;

  if (style === "words") {
    // Some locales prefer "15 percent" over "15%"
    const percentWords: Record<string, string> = {
      tr: "yüzde",
      ar: "بالمائة",
    };

    const word = percentWords[locale.split("-")[0]];
    if (word) {
      const formatter = new NumberFormatter(locale);
      return `${word} ${formatter.formatDecimal(value * 100, decimals, decimals)}`;
    }
  }

  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Examples:
// formatPercent(0.1567, 'en-US') -> "16%"
// formatPercent(0.1567, 'en-US', { decimals: 1 }) -> "15.7%"
// formatPercent(0.1567, 'tr', { style: 'words' }) -> "yüzde 16"
```

### 4.3 Unit Formatting

```typescript
// Unit formatting using Intl.NumberFormat
export const formatUnit = (
  value: number,
  unit: Intl.NumberFormatOptions["unit"],
  locale: string,
  display: "short" | "long" | "narrow" = "short",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: display,
  }).format(value);
};

// Common units
const UNITS = {
  // Digital
  BYTE: "byte",
  KILOBYTE: "kilobyte",
  MEGABYTE: "megabyte",
  GIGABYTE: "gigabyte",
  TERABYTE: "terabyte",

  // Time
  SECOND: "second",
  MINUTE: "minute",
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",

  // Length
  METER: "meter",
  KILOMETER: "kilometer",

  // Mass
  GRAM: "gram",
  KILOGRAM: "kilogram",

  // Volume
  LITER: "liter",
  MILLILITER: "milliliter",
} as const;

// Usage:
// formatUnit(1500, 'megabyte', 'en-US') -> "1,500 MB"
// formatUnit(1500, 'megabyte', 'de') -> "1.500 MB"
// formatUnit(2.5, 'hour', 'en-US', 'long') -> "2.5 hours"
```

---

## 5. Currency Support

### 5.1 Currency Display Strategy

#### 5.1.1 Currency Format Types

| Format Type    | Description      | Example (USD)       | Example (EUR)  |
| -------------- | ---------------- | ------------------- | -------------- |
| `symbol`       | Localized symbol | $1,234.56           | 1.234,56 €     |
| `narrowSymbol` | Shortest symbol  | $1,234.56           | 1.234,56 €     |
| `code`         | ISO code         | USD 1,234.56        | EUR 1,234.56   |
| `name`         | Full name        | 1,234.56 US dollars | 1.234,56 euros |

#### 5.1.2 Currency Formatting Implementation

```typescript
// Currency value object for type safety
export class Money {
  readonly amount: number; // In smallest unit (cents, satoshis, etc.)
  readonly currency: string; // ISO 4217 code
  readonly isCrypto: boolean;

  constructor(amount: number, currency: string, isCrypto = false) {
    this.amount = amount;
    this.currency = currency.toUpperCase();
    this.isCrypto = isCrypto;
  }

  // Get decimal amount for display
  getDecimalAmount(): number {
    const decimals = this.isCrypto
      ? CRYPTO_DECIMALS[this.currency] || 8
      : FIAT_DECIMALS[this.currency] || 2;
    return this.amount / Math.pow(10, decimals);
  }

  // Format for display
  format(
    locale: string,
    options: {
      display?: "symbol" | "code" | "name";
      showSign?: boolean;
    } = {},
  ): string {
    const { display = "symbol", showSign = true } = options;
    const value = this.getDecimalAmount();

    if (this.isCrypto) {
      return formatCrypto(value, this.currency, locale, display);
    }

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
      currencyDisplay: display,
      signDisplay: showSign ? "auto" : "never",
    }).format(value);
  }
}

// Fiat currency decimals
const FIAT_DECIMALS: Record<string, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  JPY: 0,
  AUD: 2,
  CAD: 2,
  CHF: 2,
  CNY: 2,
  HKD: 2,
  NZD: 2,
  SEK: 2,
  KRW: 0,
  SGD: 2,
  NOK: 2,
  MXN: 2,
  INR: 2,
  RUB: 2,
  ZAR: 2,
  TRY: 2,
  BRL: 2,
  TWD: 2,
  DKK: 2,
  PLN: 2,
  THB: 2,
  IDR: 0,
  HUF: 2,
  CZK: 2,
  ILS: 2,
  CLP: 0,
  PHP: 2,
  AED: 2,
  COP: 0,
  SAR: 2,
  MYR: 2,
  RON: 2,
};

// Crypto currency decimals
const CRYPTO_DECIMALS: Record<string, number> = {
  BTC: 8,
  ETH: 18,
  USDT: 6,
  USDC: 6,
  BNB: 18,
  XRP: 6,
  ADA: 6,
  DOGE: 8,
  DOT: 10,
  AVAX: 18,
  MATIC: 18,
  LINK: 18,
  UNI: 18,
  LTC: 8,
  BCH: 8,
  XLM: 7,
  SOL: 9,
  TRX: 6,
  ETC: 18,
  XMR: 12,
};
```

### 5.2 Cryptocurrency Display

```typescript
// Crypto-specific formatting
export const formatCrypto = (
  amount: number,
  currency: string,
  locale: string,
  display: "symbol" | "code" | "name" = "symbol",
): string => {
  const decimals = CRYPTO_DECIMALS[currency] || 8;

  // Determine significant digits based on value
  const significantDecimals = getSignificantDecimals(amount, decimals);

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: significantDecimals,
  }).format(amount);

  // Currency symbol/position varies
  const symbol = CRYPTO_SYMBOLS[currency] || currency;

  if (display === "code") {
    return `${currency} ${formatted}`;
  }

  if (display === "name") {
    const name = CRYPTO_NAMES[currency] || currency;
    return `${formatted} ${name}`;
  }

  // Default: symbol
  return `${formatted} ${symbol}`;
};

// Determine appropriate decimal places
const getSignificantDecimals = (
  amount: number,
  maxDecimals: number,
): number => {
  if (amount === 0) return 2;
  if (amount >= 1) return Math.min(6, maxDecimals);
  if (amount >= 0.001) return Math.min(8, maxDecimals);
  return maxDecimals;
};

const CRYPTO_SYMBOLS: Record<string, string> = {
  BTC: "₿",
  ETH: "Ξ",
  LTC: "Ł",
  BCH: "₿",
  XRP: "✕",
  ADA: "₳",
  DOT: "●",
  SOL: "◎",
};

const CRYPTO_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  USDC: "USD Coin",
  BNB: "BNB",
  XRP: "XRP",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  DOT: "Polkadot",
  SOL: "Solana",
};
```

### 5.3 Multi-Currency Display

```typescript
// Component for displaying amount in multiple currencies
interface MultiCurrencyDisplayProps {
  baseAmount: Money;
  targetCurrencies: string[];
  locale: string;
  exchangeRates: Record<string, number>;
}

export const MultiCurrencyDisplay: React.FC<MultiCurrencyDisplayProps> = ({
  baseAmount,
  targetCurrencies,
  locale,
  exchangeRates,
}) => {
  return (
    <div className="multi-currency">
      <div className="base-amount">
        {baseAmount.format(locale)}
      </div>
      <div className="converted-amounts">
        {targetCurrencies.map((currency) => {
          const rate = exchangeRates[currency];
          if (!rate) return null;

          const converted = convertCurrency(baseAmount, currency, rate);

          return (
            <div key={currency} className="converted">
              <span className="approx">≈</span>
              {converted.format(locale, { display: 'symbol' })}
              <span className="rate-info">
                1 {baseAmount.currency} = {rate} {currency}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Currency conversion with precision handling
const convertCurrency = (
  from: Money,
  toCurrency: string,
  rate: number
): Money => {
  const fromDecimals = from.isCrypto
    ? CRYPTO_DECIMALS[from.currency] || 8
    : FIAT_DECIMALS[from.currency] || 2;

  const toDecimals = CRYPTO_DECIMALS[toCurrency] || FIAT_DECIMALS[toCurrency] || 2;

  const fromValue = from.amount / Math.pow(10, fromDecimals);
  const toValue = fromValue * rate;
  const toAmount = Math.round(toValue * Math.pow(10, toDecimals));

  return new Money(
    toAmount,
    toCurrency,
    !!CRYPTO_DECIMALS[toCurrency]
  );
};
```

### 5.4 Accounting Format

```typescript
// Accounting format for financial statements
export const formatAccounting = (
  amount: number,
  currency: string,
  locale: string,
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencySign: "accounting",
  });

  return formatter.format(amount);
};

// Examples:
// formatAccounting(-1234.56, 'USD', 'en-US') -> "($1,234.56)"
// formatAccounting(-1234.56, 'USD', 'de') -> "(1.234,56 $)"
// formatAccounting(1234.56, 'USD', 'en-US') -> "$1,234.56"
```

---

## 6. Text Expansion Considerations

### 6.1 Expansion Factors by Language

| Language   | Average Expansion | Maximum Expansion | Notes                          |
| ---------- | ----------------- | ----------------- | ------------------------------ |
| German     | 20-30%            | 35%               | Compound words, formal address |
| French     | 15-20%            | 25%               | Accents, contractions          |
| Spanish    | 15-25%            | 30%               | Polite forms longer            |
| Italian    | 10-15%            | 20%               | Similar to English             |
| Portuguese | 15-25%            | 30%               | Brazilian variant longer       |
| Dutch      | 5-10%             | 15%               | Close to English               |
| Polish     | 15-20%            | 25%               | Complex grammar                |
| Russian    | 10-15%            | 20%               | Cyrillic characters            |
| Japanese   | -30% to -50%      | -40%              | Characters more compact        |
| Chinese    | -30% to -50%      | -40%              | Characters more compact        |
| Korean     | -10% to -20%      | -25%              | Characters more compact        |
| Arabic     | 5-10%             | 15%               | RTL considerations             |
| Hindi      | 10-15%            | 20%               | Devanagari script              |

### 6.2 UI Layout Guidelines

#### 6.2.1 Minimum Width Requirements

```css
/* Minimum width guidelines for common UI elements */

/* Buttons */
.btn {
  min-width: fit-content;
  padding-inline: 16px; /* Allow expansion */
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Form labels */
.form-label {
  min-width: fit-content;
  max-width: 300px; /* Prevent excessive width */
}

/* Navigation items */
.nav-item {
  min-width: fit-content;
  padding-inline: 12px;
}

/* Table headers */
.table-header {
  min-width: 80px; /* Absolute minimum */
  white-space: nowrap;
}

/* Card titles */
.card-title {
  min-width: fit-content;
  max-width: 100%;
  word-wrap: break-word; /* Allow breaking if necessary */
}
```

#### 6.2.2 Responsive Design for i18n

```typescript
// Hook for responsive i18n considerations
export const useResponsiveI18n = () => {
  const { i18n } = useTranslation();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkCompact = () => {
      // CJK languages can use more compact layouts
      const compactLangs = ["ja", "zh", "ko"];
      const lang = i18n.language.split("-")[0];
      setIsCompact(compactLangs.includes(lang));
    };

    checkCompact();
  }, [i18n.language]);

  return {
    isCompact,
    // Adjust spacing based on language
    spacing: isCompact ? "compact" : "normal",
    // Font size adjustments
    fontSize: isCompact ? "text-sm" : "text-base",
    // Line height
    lineHeight: isCompact ? "leading-snug" : "leading-normal",
  };
};
```

#### 6.2.3 Text Overflow Handling

```css
/* Progressive text overflow handling */

/* Level 1: Allow wrapping */
.text-expandable {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Level 2: Ellipsis for single line */
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Level 3: Line clamping for multi-line */
.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tooltip trigger for truncated text */
.text-with-tooltip {
  position: relative;

  &:hover::after {
    content: attr(data-full-text);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 12px;
    background: #333;
    color: white;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 1000;
  }
}
```

### 6.3 Flexible Layout Patterns

```typescript
// Flexible container component
interface FlexibleContainerProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  direction?: 'row' | 'column';
}

export const FlexibleContainer: React.FC<FlexibleContainerProps> = ({
  children,
  minWidth = 200,
  maxWidth = 600,
  direction = 'row',
}) => {
  return (
    <div
      className="flexible-container"
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {React.Children.map(children, (child) => (
        <div
          style={{
            flex: '1 1 auto',
            minWidth: `${minWidth}px`,
            maxWidth: `${maxWidth}px`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Adaptive grid for cards/tiles
export const AdaptiveGrid: React.FC<{
  children: React.ReactNode;
  minItemWidth?: number;
}> = ({ children, minItemWidth = 280 }) => {
  return (
    <div
      className="adaptive-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
        gap: '24px',
      }}
    >
      {children}
    </div>
  );
};
```

---

## 7. Collation and Sorting

### 7.1 Locale-Aware Sorting

```typescript
// Locale-aware collation
export class LocaleCollator {
  private collator: Intl.Collator;

  constructor(locale: string, options?: Intl.CollatorOptions) {
    this.collator = new Intl.Collator(locale, {
      sensitivity: "base",
      ignorePunctuation: true,
      ...options,
    });
  }

  compare(a: string, b: string): number {
    return this.collator.compare(a, b);
  }

  // Sort an array
  sort<T>(items: T[], keyExtractor: (item: T) => string): T[] {
    return [...items].sort((a, b) =>
      this.compare(keyExtractor(a), keyExtractor(b)),
    );
  }
}

// Usage examples
const names = ["Zebra", "apple", "Banana", "café", "café"];

// English sorting
const enCollator = new LocaleCollator("en");
names.sort(enCollator.compare);
// Result: ['apple', 'Banana', 'café', 'café', 'Zebra']

// German sorting (Ä = Ae, Ö = Oe, Ü = Ue)
const deCollator = new LocaleCollator("de");
const germanNames = ["Apfel", "Äpfel", "Öl", "Opel", "Über"];
germanNames.sort(deCollator.compare);
// Result: ['Apfel', 'Äpfel', 'Opel', 'Öl', 'Über']

// Swedish sorting (Ä, Ö, Å are separate letters at end)
const svCollator = new LocaleCollator("sv");
const swedishNames = ["Apfel", "Äpfel", "Öl", "Opel", "Åland"];
swedishNames.sort(svCollator.compare);
// Result: ['Apfel', 'Opel', 'Äpfel', 'Åland', 'Öl']
```

### 7.2 Case-Insensitive Sorting

```typescript
// Case-insensitive collation options
const CASE_INSENSITIVE_OPTIONS: Intl.CollatorOptions = {
  sensitivity: "base", // Ignore case AND accents
  caseFirst: "false", // Don't prioritize upper/lower case
};

// Case-aware but case-secondary
const CASE_AWARE_OPTIONS: Intl.CollatorOptions = {
  sensitivity: "variant", // Case and accent sensitive
  caseFirst: "upper", // Uppercase first
};

// Numeric sorting (1, 2, 10 instead of 1, 10, 2)
const NUMERIC_OPTIONS: Intl.CollatorOptions = {
  numeric: true,
  sensitivity: "base",
};
```

### 7.3 Custom Collation Rules

```typescript
// Special sorting for business domains
export const createBusinessCollator = (
  locale: string,
  domain: "contact" | "transaction" | "document",
): Intl.Collator => {
  const baseOptions: Intl.CollatorOptions = {
    sensitivity: "base",
    ignorePunctuation: true,
  };

  switch (domain) {
    case "contact":
      return new Intl.Collator(locale, {
        ...baseOptions,
        // Prioritize last name sorting
      });

    case "transaction":
      return new Intl.Collator(locale, {
        ...baseOptions,
        numeric: true, // For transaction IDs
      });

    case "document":
      return new Intl.Collator(locale, {
        ...baseOptions,
        // Natural sort for version numbers
      });

    default:
      return new Intl.Collator(locale, baseOptions);
  }
};
```

### 7.4 Sorting UI Components

```typescript
// Sortable table header
interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  locale: string;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  currentSort,
  onSort,
  locale,
}) => {
  const isActive = currentSort?.key === sortKey;
  const direction = isActive ? currentSort.direction : null;

  return (
    <th
      className={cn('sortable-header', { active: isActive })}
      onClick={() => onSort(sortKey)}
      aria-sort={direction === 'asc' ? 'ascending' :
                 direction === 'desc' ? 'descending' : 'none'}
    >
      <span>{label}</span>
      <SortIcon direction={direction} />
    </th>
  );
};

// Generic sort function for data tables
export const sortData = <T extends Record<string, unknown>>(
  data: T[],
  sortKey: string,
  direction: 'asc' | 'desc',
  locale: string
): T[] => {
  const collator = new Intl.Collator(locale, {
    sensitivity: 'base',
    numeric: true,
  });

  return [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    // Handle different types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = collator.compare(aVal, bVal);
      return direction === 'asc' ? comparison : -comparison;
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === 'asc'
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime();
    }

    // Convert to string for comparison
    const aStr = String(aVal ?? '');
    const bStr = String(bVal ?? '');
    const comparison = collator.compare(aStr, bStr);
    return direction === 'asc' ? comparison : -comparison;
  });
};
```

---

## 8. Pluralization Rules

### 8.1 ICU MessageFormat Implementation

```typescript
// ICU MessageFormat pluralization
// Install: npm install @formatjs/icu-messageformat-parser

import { IntlMessageFormat } from "@formatjs/intl";

// Plural categories by locale
const PLURAL_CATEGORIES = {
  // English: one, other
  en: ["one", "other"],
  // Arabic: zero, one, two, few, many, other
  ar: ["zero", "one", "two", "few", "many", "other"],
  // Polish: one, few, many, other
  pl: ["one", "few", "many", "other"],
  // Russian: one, few, many, other
  ru: ["one", "few", "many", "other"],
  // Chinese/Japanese/Korean: other only
  zh: ["other"],
  ja: ["other"],
  ko: ["other"],
};
```

### 8.2 Plural Message Patterns

```json
{
  "itemsCount": {
    "en": "{count, plural,\n      =0 {No items}\n      one {One item}\n      other {{count} items}\n    }",
    "ar": "{count, plural,\n      =0 {لا توجد عناصر}\n      one {عنصر واحد}\n      two {عنصران}\n      few {{count} عناصر}\n      many {{count} عنصراً}\n      other {{count} عنصر}\n    }",
    "pl": "{count, plural,\n      =0 {Brak elementów}\n      one {Jeden element}\n      few {{count} elementy}\n      many {{count} elementów}\n      other {{count} elementu}\n    }",
    "ja": "{count}件のアイテム"
  },

  "notifications": {
    "en": "{count, plural,\n      =0 {You have no notifications}\n      one {You have one notification}\n      other {You have # notifications}\n    }",
    "de": "{count, plural,\n      =0 {Sie haben keine Benachrichtigungen}\n      one {Sie haben eine Benachrichtigung}\n      other {Sie haben # Benachrichtigungen}\n    }"
  }
}
```

### 8.3 Pluralization Utility

```typescript
// Pluralization utility
export class Pluralizer {
  private locale: string;
  private messages: Record<string, string>;

  constructor(locale: string, messages: Record<string, string>) {
    this.locale = locale;
    this.messages = messages;
  }

  format(key: string, values: Record<string, number | string>): string {
    const message = this.messages[key];
    if (!message) {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }

    const msgFormat = new IntlMessageFormat(message, this.locale);
    return msgFormat.format(values);
  }
}

// React hook for pluralization
export const usePlural = () => {
  const { t, i18n } = useTranslation();

  const pluralize = (
    key: string,
    count: number,
    options: Record<string, string | number> = {}
  ): string => {
    // i18next supports ICU format with plugin
    return t(key, {
      count,
      ...options,
    });
  };

  return { pluralize };
};

// Usage in component
const NotificationBadge: React.FC<{ count: number }> = ({ count }) => {
  const { pluralize } = usePlural();

  return (
    <Badge>
      {pluralize('notifications.count', count)}
    </Badge>
  );
};
```

### 8.4 Ordinal Pluralization

```typescript
// Ordinal formatting (1st, 2nd, 3rd, 4th)
export const formatOrdinal = (n: number, locale: string): string => {
  const formatter = new Intl.PluralRules(locale, { type: "ordinal" });
  const rule = formatter.select(n);

  const suffixes: Record<string, Record<string, string>> = {
    en: {
      one: "st",
      two: "nd",
      few: "rd",
      other: "th",
    },
    de: {
      one: ".",
      other: ".",
    },
    fr: {
      one: "er",
      other: "e",
    },
  };

  const localeSuffixes = suffixes[locale.split("-")[0]] || suffixes["en"];
  const suffix = localeSuffixes[rule] || localeSuffixes["other"];

  return `${n}${suffix}`;
};

// ICU format for ordinals
const ORDINAL_MESSAGES = {
  en: "{n, selectordinal,\n    one {{n}st}\n    two {{n}nd}\n    few {{n}rd}\n    other {{n}th}\n  }",
  de: "{n, selectordinal,\n    one {{n}.}\n    other {{n}.}\n  }",
  fr: "{n, selectordinal,\n    one {{n}er}\n    other {{n}e}\n  }",
};
```

### 8.5 Select Format for Gender/Formality

```typescript
// Select format for grammatical gender
const SELECT_MESSAGES = {
  welcome: {
    en: "{gender, select,\n      male {Welcome, Mr. {name}}\n      female {Welcome, Ms. {name}}\n      other {Welcome, {name}}\n    }",
    de: "{gender, select,\n      male {Willkommen, Herr {name}}\n      female {Willkommen, Frau {name}}\n      other {Willkommen, {name}}\n    }",
    fr: "{gender, select,\n      male {Bienvenue, M. {name}}\n      female {Bienvenue, Mme {name}}\n      other {Bienvenue, {name}}\n    }",
  },

  // Formality levels
  greeting: {
    de: "{formality, select,\n      formal {Sie}\n      informal {du}\n    }",
    es: "{formality, select,\n      formal {usted}\n      informal {tú}\n    }",
    fr: "{formality, select,\n      formal {vous}\n      informal {tu}\n    }",
  },
};
```

---

## 9. Accessibility in i18n

### 9.1 Screen Reader Language Attributes

```typescript
// Language attribute management
export const useLanguageAttributes = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set lang attribute on HTML element
    document.documentElement.lang = i18n.language;

    // Set dir attribute
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  return {
    lang: i18n.language,
    dir: i18n.dir(),
  };
};

// Component with proper lang attribute for mixed content
interface LangSpanProps {
  children: React.ReactNode;
  lang: string;
  dir?: 'ltr' | 'rtl';
}

export const LangSpan: React.FC<LangSpanProps> = ({
  children,
  lang,
  dir,
}) => {
  return (
    <span
      lang={lang}
      dir={dir || (['ar', 'he', 'fa', 'ur'].includes(lang) ? 'rtl' : 'ltr')}
    >
      {children}
    </span>
  );
};
```

### 9.2 ARIA Label Translations

```typescript
// ARIA label translation patterns
const ARIA_TRANSLATIONS = {
  "en": {
    "navigation.main": "Main navigation",
    "navigation.footer": "Footer navigation",
    "button.close": "Close",
    "button.expand": "Expand",
    "button.collapse": "Collapse",
    "search.placeholder": "Search",
    "search.results": "{count} results found",
    "form.required": "Required field",
    "form.error": "Error: {message}",
    "loading": "Loading",
    "alert.success": "Success: {message}",
    "alert.error": "Error: {message}",
    "alert.warning": "Warning: {message}",
    "alert.info": "Information: {message}",
  },
  "de": {
    "navigation.main": "Hauptnavigation",
    "navigation.footer": "Fußzeilen-Navigation",
    "button.close": "Schließen",
    "button.expand": "Erweitern",
    "button.collapse": "Einklappen",
    "search.placeholder": "Suchen",
    "search.results": "{count} Ergebnisse gefunden",
    "form.required": "Pflichtfeld",
    "form.error": "Fehler: {message}",
    "loading": "Wird geladen",
    "alert.success": "Erfolg: {message}",
    "alert.error": "Fehler: {message}",
    "alert.warning": "Warnung: {message}",
    "alert.info": "Information: {message}",
  }
};

// Accessible button component
interface AccessibleButtonProps {
  label: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  onClick: () => void;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  ariaLabel,
  ariaDescribedBy,
  onClick,
}) => {
  const { t } = useTranslation('a11y');

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || t(`button.${label}`)}
      aria-describedby={ariaDescribedBy}
    >
      {label}
    </button>
  );
};
```

### 9.3 Keyboard Layout Considerations

```typescript
// Keyboard shortcut localization
const KEYBOARD_SHORTCUTS = {
  "en": {
    "save": "Ctrl+S",
    "print": "Ctrl+P",
    "search": "Ctrl+K",
    "help": "?",
  },
  "de": {
    "save": "Strg+S",
    "print": "Strg+P",
    "search": "Strg+K",
    "help": "?",
  },
  "fr": {
    "save": "Ctrl+S",
    "print": "Ctrl+P",
    "search": "Ctrl+K",
    "help": "?",
  },
  // macOS variants
  "mac": {
    "save": "⌘S",
    "print": "⌘P",
    "search": "⌘K",
    "help": "?",
  },
};

// Display keyboard shortcut based on platform and locale
export const getKeyboardShortcut = (
  action: string,
  locale: string,
  isMac: boolean
): string => {
  if (isMac) {
    return KEYBOARD_SHORTCUTS['mac'][action] || action;
  }

  const langKey = locale.split('-')[0];
  return KEYBOARD_SHORTCUTS[langKey]?.[action] ||
         KEYBOARD_SHORTCUTS['en'][action] ||
         action;
};

// Keyboard shortcut component
export const KeyboardShortcut: React.FC<{
  action: string;
  className?: string;
}> = ({ action, className }) => {
  const { i18n } = useTranslation();
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = getKeyboardShortcut(action, i18n.language, isMac);

  return (
    <kbd className={cn('keyboard-shortcut', className)}>
      {shortcut}
    </kbd>
  );
};
```

### 9.4 Live Region Announcements

```typescript
// Live region for dynamic content announcements
export const LiveRegion: React.FC<{
  message: string;
  priority: 'polite' | 'assertive';
}> = ({ message, priority }) => {
  const { t } = useTranslation('a11y');

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Hook for announcing to screen readers
export const useAnnouncer = () => {
  const [announcement, setAnnouncement] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = useCallback((
    message: string,
    opts: { priority?: 'polite' | 'assertive'; clearAfter?: number } = {}
  ) => {
    setMessage(message);
    setPriority(opts.priority || 'polite');

    // Clear after specified time
    if (opts.clearAfter) {
      setTimeout(() => setAnnouncement(''), opts.clearAfter);
    }
  }, []);

  return { announcement, priority, announce };
};
```

---

## 10. Implementation Architecture

### 10.1 i18n Library Selection

#### 10.1.1 Recommended Stack

| Component         | Library                              | Version | Purpose                    |
| ----------------- | ------------------------------------ | ------- | -------------------------- |
| Core i18n         | `react-i18next`                      | ^13.x   | React integration          |
| i18n Backend      | `i18next`                            | ^23.x   | Core i18n framework        |
| HTTP Backend      | `i18next-http-backend`               | ^2.x    | Load translations via HTTP |
| ICU Format        | `i18next-icu`                        | ^2.x    | ICU MessageFormat support  |
| Browser Detection | `i18next-browser-languagedetector`   | ^7.x    | Auto language detection    |
| ICU Parser        | `@formatjs/icu-messageformat-parser` | ^2.x    | ICU message parsing        |

#### 10.1.2 Installation

```bash
npm install react-i18next i18next i18next-http-backend i18next-icu i18next-browser-languagedetector @formatjs/icu-messageformat-parser
```

### 10.2 i18n Configuration

```typescript
// i18n.ts - Main configuration
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// ICU pluralizers for complex languages
import { ar, pl, ru } from "make-plural/plurals";

const icu = new ICU({
  localeData: {
    ar: { plurals: ar },
    pl: { plurals: pl },
    ru: { plurals: ru },
  },
});

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(icu)
  .use(initReactI18next)
  .init({
    // Fallback configuration
    fallbackLng: {
      "zh-Hans": ["zh", "en"],
      "zh-Hant": ["zh", "en"],
      "pt-BR": ["pt", "en"],
      "pt-PT": ["pt", "en"],
      "es-MX": ["es", "en"],
      "es-AR": ["es", "en"],
      "fr-CA": ["fr", "en"],
      default: ["en"],
    },

    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === "development",

    // Namespace configuration
    ns: [
      "common", // Shared translations
      "navigation", // Navigation labels
      "dashboard", // Dashboard-specific
      "forms", // Form labels, validation
      "errors", // Error messages
      "a11y", // Accessibility labels
      "validation", // Validation messages
      "legal", // Legal text
      "emails", // Email templates
    ],
    defaultNS: "common",

    // Backend configuration
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}",
    },

    // Detection configuration
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
    },

    // Interpolation
    interpolation: {
      escapeValue: true, // XSS protection
    },

    // React configuration
    react: {
      useSuspense: true,
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    },

    // Loading configuration
    partialBundledLanguages: true,
    load: "currentOnly", // Only load exact locale
  });

export default i18n;
```

### 10.3 Translation Key Naming Conventions

#### 10.3.1 Naming Structure

```
{feature}.{component}.{element}.{variant}
```

**Examples:**

```json
{
  "dashboard": {
    "header": {
      "title": "Dashboard",
      "subtitle": "Welcome back, {{name}}"
    },
    "widgets": {
      "balance": {
        "label": "Current Balance",
        "tooltip": "Total available funds",
        "empty": "No balance information available"
      },
      "transactions": {
        "title": "Recent Transactions",
        "viewAll": "View All",
        "count": "{{count}} transactions"
      }
    }
  },

  "forms": {
    "validation": {
      "required": "{{field}} is required",
      "email": "Please enter a valid email address",
      "minLength": "{{field}} must be at least {{count}} characters",
      "maxLength": "{{field}} must not exceed {{count}} characters",
      "pattern": "{{field}} format is invalid"
    },
    "fields": {
      "email": {
        "label": "Email Address",
        "placeholder": "you@example.com",
        "hint": "We'll never share your email"
      },
      "password": {
        "label": "Password",
        "placeholder": "Enter your password",
        "strength": {
          "weak": "Weak",
          "medium": "Medium",
          "strong": "Strong"
        }
      }
    }
  }
}
```

#### 10.3.2 Key Naming Rules

| Rule              | Description                | Example                              |
| ----------------- | -------------------------- | ------------------------------------ |
| lowercase         | All keys lowercase         | `submitButton` ❌ `submit_button` ✅ |
| camelCase         | Multi-word keys            | `firstName` not `first_name`         |
| descriptive       | Clear, descriptive names   | `saveChangesButton` not `btn1`       |
| hierarchical      | Dot notation for hierarchy | `user.profile.title`                 |
| avoid nesting > 4 | Maximum 4 levels deep      | Flatten deeper structures            |
| no dynamic keys   | No computed key names      | Use interpolation instead            |

### 10.4 Namespace Organization

```typescript
// Namespace structure
const NAMESPACES = {
  // Core namespaces - always loaded
  CORE: ["common", "navigation", "a11y"],

  // Feature namespaces - lazy loaded
  FEATURES: {
    AUTH: ["auth", "auth.errors"],
    DASHBOARD: ["dashboard", "dashboard.widgets"],
    TRANSACTIONS: ["transactions", "transactions.history"],
    SETTINGS: ["settings", "settings.profile", "settings.security"],
    SUPPORT: ["support", "support.faq", "support.contact"],
  },

  // Legal namespaces - loaded on demand
  LEGAL: ["legal.terms", "legal.privacy", "legal.cookies"],

  // Email namespaces - server-side
  EMAILS: ["emails.welcome", "emails.notifications", "emails.security"],
};

// Lazy loading configuration
export const lazyLoadNamespace = async (
  namespace: string,
  language: string,
): Promise<void> => {
  await i18n.loadNamespaces(namespace);
};

// Route-based namespace loading
export const useRouteNamespaces = (namespaces: string[]) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    namespaces.forEach((ns) => {
      if (!i18n.hasResourceBundle(i18n.language, ns)) {
        i18n.loadNamespaces(ns);
      }
    });
  }, [namespaces, i18n]);
};
```

### 10.5 Translation Management Platform Integration

#### 10.5.1 Supported Platforms

| Platform      | API  | Features                        | Recommended For |
| ------------- | ---- | ------------------------------- | --------------- |
| **Phrase**    | REST | CLI, GitHub sync, webhooks      | Enterprise      |
| **Lokalise**  | REST | OTA updates, screenshot context | Teams           |
| **Crowdin**   | REST | Git integration, MT suggestions | Open source     |
| **Transifex** | REST | Live, Enterprise features       | Large scale     |
| **Smartling** | REST | Professional services           | Enterprise      |

#### 10.5.2 Phrase Integration Configuration

```typescript
// phrase.config.js
module.exports = {
  project: {
    id: process.env.PHRASE_PROJECT_ID,
  },

  // Push configuration (upload source files)
  push: {
    sources: [
      {
        file: "locales/en/<namespace>.json",
        params: {
          file_format: "i18next_4",
          locale_id: "en",
          tags: "vantus-portal",
        },
      },
    ],
  },

  // Pull configuration (download translations)
  pull: {
    targets: [
      {
        file: "locales/<locale_code>/<namespace>.json",
        params: {
          file_format: "i18next_4",
          include_empty_translations: false,
          tags: "vantus-portal",
        },
      },
    ],
  },

  // Webhook configuration
  webhooks: {
    translations_updated: {
      url: "https://api.vantus.systems/i18n/webhook/phrase",
      secret: process.env.PHRASE_WEBHOOK_SECRET,
    },
  },
};
```

#### 10.5.3 CI/CD Integration

```yaml
# .github/workflows/i18n-sync.yml
name: i18n Sync

on:
  push:
    branches: [main]
    paths:
      - "locales/en/**"
  schedule:
    - cron: "0 */6 * * *" # Every 6 hours

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install Phrase CLI
        run: npm install -g @phrase/cli

      - name: Push source strings
        env:
          PHRASE_ACCESS_TOKEN: ${{ secrets.PHRASE_ACCESS_TOKEN }}
        run: phrase push

      - name: Pull translations
        env:
          PHRASE_ACCESS_TOKEN: ${{ secrets.PHRASE_ACCESS_TOKEN }}
        run: phrase pull

      - name: Check for missing translations
        run: npm run i18n:check

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: "chore(i18n): sync translations"
          title: "i18n: Translation Update"
          branch: chore/i18n-sync
```

---

## 11. Content Localization

### 11.1 Image Localization

#### 11.1.1 Image Naming Convention

```
/images/
  /{locale}/
    /illustrations/
    /icons/
    /screenshots/
  /default/    # Fallback images
```

#### 11.1.2 Localized Image Component

```typescript
interface LocalizedImageProps {
  src: string; // Base filename without locale
  alt: string;
  width?: number;
  height?: number;
  fallback?: string;
}

export const LocalizedImage: React.FC<LocalizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fallback = '/images/default/placeholder.png',
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  // Try locale-specific, then language-only, then default
  const imagePaths = [
    `/images/${locale}/${src}`,
    `/images/${locale.split('-')[0]}/${src}`,
    `/images/default/${src}`,
    fallback,
  ];

  const [currentSrc, setCurrentSrc] = useState(imagePaths[0]);
  const [attemptIndex, setAttemptIndex] = useState(0);

  const handleError = () => {
    if (attemptIndex < imagePaths.length - 1) {
      setAttemptIndex(attemptIndex + 1);
      setCurrentSrc(imagePaths[attemptIndex + 1]);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};
```

#### 11.1.3 Text-in-Image Guidelines

**AVOID text in images when possible.** If unavoidable:

1. Use SVG with translatable text
2. Provide separate image files per locale
3. Use generic imagery without text

```typescript
// SVG with translatable text
interface LocalizedSVGProps {
  name: string;
  className?: string;
}

export const LocalizedSVG: React.FC<LocalizedSVGProps> = ({
  name,
  className,
}) => {
  const { t } = useTranslation('illustrations');

  switch (name) {
    case 'empty-state':
      return (
        <svg className={className} viewBox="0 0 200 200">
          {/* Graphics */}
          <text x="100" y="150" textAnchor="middle">
            {t('emptyState.message')}
          </text>
        </svg>
      );
    default:
      return null;
  }
};
```

### 11.2 Video Subtitles

```typescript
// Video player with subtitle support
interface VideoPlayerProps {
  src: string;
  poster?: string;
  subtitles: Record<string, string>; // locale -> subtitle URL
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  subtitles,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return (
    <video controls poster={poster}>
      <source src={src} type="video/mp4" />

      {Object.entries(subtitles).map(([lang, url]) => (
        <track
          key={lang}
          kind="subtitles"
          src={url}
          srcLang={lang}
          label={LANGUAGE_NAMES[lang]}
          default={lang === currentLang}
        />
      ))}

      Your browser does not support the video tag.
    </video>
  );
};

const LANGUAGE_NAMES: Record<string, string> = {
  'en': 'English',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
  'zh': '中文',
  'ar': 'العربية',
};
```

### 11.3 Document Templates

```typescript
// Locale-aware document generation
interface DocumentTemplate {
  id: string;
  name: string;
  locales: string[];
  variables: string[];
}

const DOCUMENT_TEMPLATES: Record<string, DocumentTemplate> = {
  invoice: {
    id: "invoice",
    name: "Invoice Template",
    locales: ["en", "de", "fr", "es", "ja", "zh"],
    variables: ["invoiceNumber", "date", "amount", "currency", "clientName"],
  },
  receipt: {
    id: "receipt",
    name: "Receipt Template",
    locales: ["en", "de", "fr", "es", "ja", "zh"],
    variables: ["receiptNumber", "date", "amount", "currency", "paymentMethod"],
  },
  statement: {
    id: "statement",
    name: "Account Statement",
    locales: ["en", "de", "fr"],
    variables: [
      "startDate",
      "endDate",
      "accountNumber",
      "openingBalance",
      "closingBalance",
    ],
  },
};

// Document generation service
export class DocumentGenerationService {
  async generate(
    templateId: string,
    locale: string,
    data: Record<string, unknown>,
  ): Promise<Blob> {
    const template = DOCUMENT_TEMPLATES[templateId];

    if (!template.locales.includes(locale)) {
      throw new Error(
        `Template ${templateId} not available for locale ${locale}`,
      );
    }

    // Call document generation API
    const response = await fetch("/api/documents/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template: templateId,
        locale,
        data,
      }),
    });

    return response.blob();
  }
}
```

### 11.4 Legal Text Localization

```typescript
// Legal text management
interface LegalDocument {
  id: string;
  version: string;
  effectiveDate: string;
  locales: string[];
  jurisdiction: string;
}

const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  'terms-of-service': {
    id: 'terms-of-service',
    version: '2024.1',
    effectiveDate: '2024-01-01',
    locales: ['en', 'de', 'fr', 'es', 'ja'],
    jurisdiction: 'global',
  },
  'privacy-policy': {
    id: 'privacy-policy',
    version: '2024.1',
    effectiveDate: '2024-01-01',
    locales: ['en', 'de', 'fr', 'es', 'ja', 'zh'],
    jurisdiction: 'global',
  },
  'gdpr-addendum': {
    id: 'gdpr-addendum',
    version: '2024.1',
    effectiveDate: '2024-01-01',
    locales: ['en', 'de', 'fr'],
    jurisdiction: 'EU',
  },
  'ccpa-notice': {
    id: 'ccpa-notice',
    version: '2024.1',
    effectiveDate: '2024-01-01',
    locales: ['en'],
    jurisdiction: 'US-CA',
  },
};

// Legal text component with jurisdiction detection
export const LegalDocument: React.FC<{
  documentId: string;
}> = ({ documentId }) => {
  const { i18n, t } = useTranslation('legal');
  const userLocation = useUserLocation();

  const doc = LEGAL_DOCUMENTS[documentId];

  // Determine applicable version based on jurisdiction
  const applicableDoc = getApplicableDocument(
    documentId,
    i18n.language,
    userLocation.country
  );

  if (!applicableDoc) {
    return <div>Document not available in your region.</div>;
  }

  return (
    <article className="legal-document">
      <header>
        <h1>{t(`${documentId}.title`)}</h1>
        <p className="effective-date">
          {t('effectiveDate')}: {applicableDoc.effectiveDate}
        </p>
        <p className="version">
          {t('version')}: {applicableDoc.version}
        </p>
      </header>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: t(`${documentId}.content`)
        }}
      />
    </article>
  );
};
```

---

## 12. Testing Requirements

### 12.1 Pseudo-Localization Testing

```typescript
// Pseudo-localization configuration
const PSEUDO_CONFIG = {
  // Expansion factor (30% longer than English)
  expansionFactor: 1.3,

  // Character mapping (accented characters)
  accents: {
    a: "á",
    e: "é",
    i: "í",
    o: "ó",
    u: "ú",
    A: "Á",
    E: "É",
    I: "Í",
    O: "Ó",
    U: "Ú",
  },

  // RTL markers for mixed-direction testing
  rtlMarkers: {
    prefix: "‮",
    suffix: "‭",
  },

  // Delimiters to identify text
  prefix: "[!!",
  suffix: "!!]",
};

// Pseudo-localization function
export const pseudoLocalize = (text: string): string => {
  // Add delimiters
  let result = `${PSEUDO_CONFIG.prefix} ${text} ${PSEUDO_CONFIG.suffix}`;

  // Add accent characters
  result = result.replace(
    /[aeiouAEIOU]/g,
    (char) => PSEUDO_CONFIG.accents[char] || char,
  );

  // Expand text
  const expansion = Math.ceil(
    text.length * (PSEUDO_CONFIG.expansionFactor - 1),
  );
  result = result + "~".repeat(expansion);

  return result;
};

// i18next pseudo-locale plugin
const pseudoLocalePlugin = {
  type: "postProcessor",
  name: "pseudo",
  process: (value: string) => pseudoLocalize(value),
};

i18n.use(pseudoLocalePlugin);
```

### 12.2 RTL Layout Testing

```typescript
// RTL test scenarios
const RTL_TEST_SCENARIOS = [
  {
    name: "Navigation layout",
    test: () => {
      // Verify logo is on right, menu on left
    },
  },
  {
    name: "Form alignment",
    test: () => {
      // Verify labels align correctly
    },
  },
  {
    name: "Table column order",
    test: () => {
      // Verify first column is on right
    },
  },
  {
    name: "Button order",
    test: () => {
      // Verify primary action is on left
    },
  },
  {
    name: "Icon mirroring",
    test: () => {
      // Verify directional icons are mirrored
    },
  },
  {
    name: "Mixed content",
    test: () => {
      // Verify LTR text in RTL context displays correctly
    },
  },
];

// RTL visual regression test
export const testRTLVisualRegression = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set RTL locale
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("i18nextLng", "ar");
  });

  await page.goto("http://localhost:3000");
  await page.setViewport({ width: 1280, height: 720 });

  // Take screenshot
  await page.screenshot({
    path: "rtl-screenshot.png",
    fullPage: true,
  });

  await browser.close();
};
```

### 12.3 Translation Completeness Checks

```typescript
// Translation completeness checker
interface CompletenessReport {
  locale: string;
  namespace: string;
  totalKeys: number;
  translatedKeys: number;
  missingKeys: string[];
  percentage: number;
}

export const checkTranslationCompleteness = async (
  sourceLocale: string = "en",
  targetLocales: string[],
): Promise<CompletenessReport[]> => {
  const reports: CompletenessReport[] = [];

  // Load source translations
  const sourceTranslations = await loadTranslations(sourceLocale);
  const sourceKeys = extractAllKeys(sourceTranslations);

  for (const locale of targetLocales) {
    const translations = await loadTranslations(locale);

    for (const [namespace, content] of Object.entries(sourceTranslations)) {
      const namespaceSourceKeys = extractAllKeys({ [namespace]: content });
      const namespaceTargetKeys = extractAllKeys({
        [namespace]: translations[namespace] || {},
      });

      const missingKeys = namespaceSourceKeys.filter(
        (key) => !namespaceTargetKeys.includes(key),
      );

      reports.push({
        locale,
        namespace,
        totalKeys: namespaceSourceKeys.length,
        translatedKeys: namespaceSourceKeys.length - missingKeys.length,
        missingKeys,
        percentage:
          ((namespaceSourceKeys.length - missingKeys.length) /
            namespaceSourceKeys.length) *
          100,
      });
    }
  }

  return reports;
};

// CLI script for CI
const runCompletenessCheck = async () => {
  const locales = ["de", "fr", "es", "ja", "zh", "ar", "ko"];
  const reports = await checkTranslationCompleteness("en", locales);

  let hasErrors = false;

  for (const report of reports) {
    if (report.percentage < 85) {
      console.error(
        `❌ ${report.locale}/${report.namespace}: ${report.percentage.toFixed(1)}% ` +
          `(${report.translatedKeys}/${report.totalKeys})`,
      );
      console.error(`   Missing: ${report.missingKeys.join(", ")}`);
      hasErrors = true;
    } else if (report.percentage < 100) {
      console.warn(
        `⚠️ ${report.locale}/${report.namespace}: ${report.percentage.toFixed(1)}% ` +
          `(${report.translatedKeys}/${report.totalKeys})`,
      );
    } else {
      console.log(`✅ ${report.locale}/${report.namespace}: 100% complete`);
    }
  }

  process.exit(hasErrors ? 1 : 0);
};
```

### 12.4 Locale Switching Tests

```typescript
// Locale switching test suite
describe('Locale Switching', () => {
  it('should switch locale without page reload', async () => {
    render(<App />);

    // Initial locale
    expect(screen.getByText('Welcome')).toBeInTheDocument();

    // Switch locale
    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('Deutsch'));

    // Verify no reload (check for React state preservation)
    expect(screen.getByText('Willkommen')).toBeInTheDocument();
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
  });

  it('should persist locale preference', async () => {
    render(<App />);

    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('Deutsch'));

    // Reload page
    window.location.reload();

    // Verify locale persisted
    expect(screen.getByText('Willkommen')).toBeInTheDocument();
  });

  it('should update document lang attribute', async () => {
    render(<App />);

    expect(document.documentElement.lang).toBe('en');

    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('日本語'));

    expect(document.documentElement.lang).toBe('ja');
  });

  it('should update text direction for RTL languages', async () => {
    render(<App />);

    expect(document.documentElement.dir).toBe('ltr');

    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('العربية'));

    expect(document.documentElement.dir).toBe('rtl');
  });

  it('should format dates correctly after locale switch', async () => {
    render(<App />);

    // US format
    expect(screen.getByText('2/22/2026')).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('Deutsch'));

    // German format
    expect(screen.getByText('22.02.2026')).toBeInTheDocument();
  });

  it('should format numbers correctly after locale switch', async () => {
    render(<App />);

    await userEvent.click(screen.getByLabelText('Change language'));
    await userEvent.click(screen.getByText('Deutsch'));

    // German number format
    expect(screen.getByText('1.234,56')).toBeInTheDocument();
  });
});
```

### 12.5 Automated i18n Testing Script

```typescript
// scripts/i18n-test.ts
import { test } from "@playwright/test";

const LOCALES = ["en", "de", "fr", "es", "ja", "zh", "ar", "ko"];
const VIEWPORTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 720 },
];

test.describe("i18n Visual Regression", () => {
  for (const locale of LOCALES) {
    for (const viewport of VIEWPORTS) {
      test(`${locale} - ${viewport.name}`, async ({ page }) => {
        // Set locale
        await page.goto(`http://localhost:3000?lng=${locale}`);
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        // Wait for translations to load
        await page.waitForSelector('[data-i18n-loaded="true"]');

        // Take screenshot
        await expect(page).toHaveScreenshot(`${locale}-${viewport.name}.png`, {
          fullPage: true,
          threshold: 0.2,
        });
      });
    }
  }
});

// Run: npx playwright test i18n-test.ts
```

---

## Appendix A: Locale Configuration Reference

```typescript
// config/locales.ts
export const SUPPORTED_LOCALES = {
  // Tier 1
  "en-US": { tier: 1, rtl: false, name: "English (US)" },
  "en-GB": { tier: 1, rtl: false, name: "English (UK)" },
  "es-ES": { tier: 1, rtl: false, name: "Español" },
  "es-MX": { tier: 1, rtl: false, name: "Español (México)" },
  "fr-FR": { tier: 1, rtl: false, name: "Français" },
  "fr-CA": { tier: 1, rtl: false, name: "Français (Canada)" },
  "de-DE": { tier: 1, rtl: false, name: "Deutsch" },
  "pt-BR": { tier: 1, rtl: false, name: "Português (Brasil)" },
  "pt-PT": { tier: 1, rtl: false, name: "Português" },
  "ja-JP": { tier: 1, rtl: false, name: "日本語" },
  "zh-Hans": { tier: 1, rtl: false, name: "简体中文" },
  "zh-Hant": { tier: 1, rtl: false, name: "繁體中文" },
  "ko-KR": { tier: 1, rtl: false, name: "한국어" },
  "ar-SA": { tier: 1, rtl: true, name: "العربية" },
  "hi-IN": { tier: 1, rtl: false, name: "हिन्दी" },

  // Tier 2
  "it-IT": { tier: 2, rtl: false, name: "Italiano" },
  "nl-NL": { tier: 2, rtl: false, name: "Nederlands" },
  "pl-PL": { tier: 2, rtl: false, name: "Polski" },
  "ru-RU": { tier: 2, rtl: false, name: "Русский" },
  "tr-TR": { tier: 2, rtl: false, name: "Türkçe" },
  "vi-VN": { tier: 2, rtl: false, name: "Tiếng Việt" },
  "th-TH": { tier: 2, rtl: false, name: "ไทย" },
  "id-ID": { tier: 2, rtl: false, name: "Bahasa Indonesia" },
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

export const isRTLLocale = (locale: string): boolean => {
  const lang = locale.split("-")[0];
  return ["ar", "he", "fa", "ur"].includes(lang);
};

export const getLocaleTier = (locale: string): number => {
  return SUPPORTED_LOCALES[locale as SupportedLocale]?.tier || 3;
};
```

## Appendix B: Glossary

| Term                    | Definition                                        |
| ----------------------- | ------------------------------------------------- |
| **i18n**                | Internationalization (18 letters between i and n) |
| **l10n**                | Localization (10 letters between l and n)         |
| **g11n**                | Globalization (11 letters between g and n)        |
| **BCP 47**              | Best Current Practice 47 - Language tag standard  |
| **ICU**                 | International Components for Unicode              |
| **LTR**                 | Left-to-Right text direction                      |
| **RTL**                 | Right-to-Left text direction                      |
| **Pseudo-localization** | Testing technique using fake translations         |
| **MessageFormat**       | ICU standard for pluralization and formatting     |
| **Collator**            | Locale-aware string comparison                    |

---

## Document History

| Version | Date       | Author            | Changes               |
| ------- | ---------- | ----------------- | --------------------- |
| 1.0.0   | 2026-02-22 | Architecture Team | Initial specification |

---

_This document is a living specification. Updates should be proposed through the Architecture Review Board process._
