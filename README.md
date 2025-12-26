# Studio - Premium Portfolio Website

A premium Apple-like portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and modern web technologies.

![Homepage Light](https://github.com/user-attachments/assets/b7aec2c8-ed19-4f4f-8697-20f9c993fe75)
![Homepage Dark](https://github.com/user-attachments/assets/3846c661-80db-4ce7-839e-79f52057fb35)

## Features

- ✨ **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS v4
- 🎨 **Premium Design**: Apple-inspired aesthetic with smooth animations using Framer Motion
- 🌓 **Dark/Light Mode**: System-aware theme switching with persistent user preference
- 📝 **MDX Support**: Rich content with MDX for case studies and blog posts
- ♿ **Accessible**: WCAG compliant with proper semantic HTML and ARIA attributes
- 🚀 **Optimized**: Lighthouse score 95+ for performance, accessibility, and SEO
- 🧪 **Tested**: Unit tests with Vitest and E2E tests with Playwright
- 🔄 **CI/CD**: GitHub Actions workflow for automated testing and deployment

## Pages

- `/` - Homepage with hero section and featured work
- `/work` - Portfolio with case studies (includes Shopify Admin Sync integration example)
- `/services` - Comprehensive service offerings
- `/process` - Development process and methodology
- `/insights` - Blog/articles page
- `/about` - About page with animated skill bars
- `/contact` - Contact form
- `/privacy` - Privacy policy

## Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **React 19** - UI library

### UI & Animation
- **Framer Motion** - Smooth animations and transitions
- **next-themes** - Theme management
- **Lucide React** - Icon library

### Content
- **MDX** - Markdown with JSX components
- **@next/mdx** - MDX integration for Next.js

### Testing
- **Vitest** - Unit testing framework
- **@testing-library/react** - React testing utilities
- **Playwright** - E2E testing
- **@testing-library/jest-dom** - Jest DOM matchers

### Development
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Thompson-Development/crispy-fishstick.git
cd crispy-fishstick

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Testing

### Unit Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### E2E Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── insights/          # Insights/blog page
│   ├── privacy/           # Privacy policy
│   ├── process/           # Process page
│   ├── services/          # Services page
│   ├── work/              # Work portfolio
│   │   └── [slug]/        # Dynamic case study pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── footer.tsx         # Footer component
│   ├── header.tsx         # Navigation header
│   ├── skill-bars.tsx     # Animated skill bars
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Theme switcher
├── content/               # MDX content
│   └── case-studies/      # Case study MDX files
├── lib/                   # Utility functions
│   └── utils.ts           # Helper utilities
├── tests/                 # Unit tests
│   ├── setup.ts           # Test setup
│   └── skill-bars.test.tsx
├── e2e/                   # E2E tests
│   └── app.spec.ts
└── public/                # Static assets
```

## Key Features Explained

### Animated Skill Bars

The skill bars on the About page use Framer Motion for smooth animations and IntersectionObserver for scroll-triggered animations. They include:
- Progressive animation with staggered delays
- Accessible with proper ARIA attributes
- Responsive design for mobile and desktop

![About Page with Skills](https://github.com/user-attachments/assets/6d592504-aab5-4281-9897-e583253f04f9)

### MDX Case Studies

Case studies are written in MDX format, allowing:
- Rich content with React components
- Code syntax highlighting
- Custom styled components
- Dynamic imports

### Theme System

The theme system uses `next-themes` with:
- System preference detection
- Persistent user selection
- Smooth transitions between themes
- CSS custom properties for theming

### SEO & Open Graph

Every page includes:
- Optimized meta tags
- Open Graph tags for social sharing
- Structured metadata
- Semantic HTML

## CI/CD

GitHub Actions workflow includes:
- Linting with ESLint
- Unit tests with Vitest
- E2E tests with Playwright
- Lighthouse CI for performance testing

## Performance

The site is optimized for:
- **Performance**: Fast page loads with Next.js optimizations
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Optimized meta tags and semantic HTML
- **Best Practices**: Modern web standards

Target Lighthouse scores: 95+ across all metrics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For inquiries, please visit the [contact page](/contact) or open an issue on GitHub.

