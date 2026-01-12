## 📂 **details_DE1.md — Implementation Details & Asset Checklist**

### 1. Folders & Files

| Path                                                        | Description                                       |
| ----------------------------------------------------------- | ------------------------------------------------- |
| `/app/design-engineering/page.tsx`                          | Main route file (SSR).                            |
| `/app/design-engineering/layout.tsx`                        | Optional wrapper for page metadata.               |
| `/app/design-engineering/components/HeroSection.tsx`        | Hero component.                                   |
| `/app/design-engineering/components/PhilosophySection.tsx`  | Copy + systemization module.                      |
| `/app/design-engineering/components/StackSection.tsx`       | Design stack logos and metadata.                  |
| `/app/design-engineering/components/ProcessSection.tsx`     | Expanded “Step 3” timeline.                       |
| `/app/design-engineering/components/CaseStudySection.tsx`   | Case study showcase (Fintech Dashboard).          |
| `/app/design-engineering/components/InteractiveDemo.tsx`    | Framer Motion demo (toggle or hover interaction). |
| `/app/design-engineering/data/copy.design-engineering.json` | Structured copy data source.                      |
| `/public/assets/design-engineering/figma-to-react.svg`      | Hero graphic.                                     |
| `/public/assets/design-engineering/before-after-slider.mp4` | Slider demo.                                      |
| `/public/assets/design-engineering/fintech-dashboard.webp`  | Case study image.                                 |
| `/styles/design-engineering.module.css`                     | Local styling overrides.                          |
| `/tests/design-engineering.spec.tsx`                        | Cypress/Playwright E2E tests.                     |

---

### 2. Required Imports

```tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import copy from "../data/copy.design-engineering.json";
```

---

### 3. Assets & Media Specs

| Asset                     | Type        | Size Target | Optimization                    |
| ------------------------- | ----------- | ----------- | ------------------------------- |
| `figma-to-react.svg`      | SVG         | < 200 KB    | inline SVG, aria-labeled        |
| `before-after-slider.mp4` | MP4 (H.264) | < 1 MB      | preload metadata only           |
| `fintech-dashboard.webp`  | Image       | 1600×900 px | responsive sizes via next/image |

---

### 4. Tests

* ✅ Visual regression (Baseline screenshots in dark/light modes).
* ✅ Accessibility (Axe + Tab navigation).
* ✅ Performance (Lighthouse LCP/INP budget tests).
* ✅ SEO (Structured data presence).

---

### 5. Deployment Checklist

* [ ] Add route link to nav component.
* [ ] Generate Open Graph image (`og/design-engineering.png`).
* [ ] Run `npm run build && npm run test:e2e`.
* [ ] Push and verify preview build on Vercel/production.
