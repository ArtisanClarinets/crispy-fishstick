# Vantus Systems Homepage - Quick Developer Reference

## 🚀 Quick Start

### Install Dependencies
```bash
npm install remotion @remotion/player @remotion/media-utils lucide-react
```

### Start Development
```bash
npm run dev
# Visit http://localhost:3000 (or next available port)
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Key Files

| File | Purpose | Edit When |
|------|---------|-----------|
| `app/(site)/page.tsx` | Main homepage | Content changes, layout updates |
| `components/remotion/VantusDynamicHero.tsx` | Hero animation | Change opening animation |
| `components/remotion/DataStreamAnimation.tsx` | Metrics viz | Update performance metrics |
| `docs/VANTUS_HOMEPAGE_GUIDE.md` | Full documentation | Refer to for deep dives |
| `docs/VANTUS_HOMEPAGE_STITCH.md` | Stitch integration | Design sync instructions |

---

## 🎨 Design System

### Colors
```typescript
Primary Blue:     #0d7ff2
Dark Navy:        #0f184c
Slate Dark:       #1e293b
Slate Light:      #f8fafc
Gray Text:        #64748b
White:            #ffffff
```

### Typography
```typescript
H1: 56px, weight 700, INTER
H2: 48px, weight 700, INTER
H3: 20px, weight 600, INTER
Body: 16px, weight 400, INTER
```

### Spacing
```typescript
Section padding:  80px (top/bottom), 24px (left/right)
Card gaps:        24-32px
Text spacing:     12-24px
```

---

## 🎬 Remotion Components

### Using RemotionDemo
```typescript
import { RemotionDemo } from '@/components/remotion/RemotionDemo';

<RemotionDemo compositionId="hero" />
// or
<RemotionDemo compositionId="data" />
```

### Creating New Remotion Animation
```typescript
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const MyAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Your animation here */}
    </AbsoluteFill>
  );
};
```

---

## ✏️ Common Edits

### Change Hero Text
```typescript
// Line ~45 in app/(site)/page.tsx
<h1 style={{ /* ... */ }}>
  We Make Tech Simple.
</h1>
```

### Update CTA Button
```typescript
// Line ~110
<button style={{ /* ... */ }}>
  Get Your Free Tech Audit <ArrowRight size={18} />
</button>
```

### Add New Section
```typescript
<section style={{
  background: '#f8fafc',
  padding: '80px 24px'
}}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    {/* Your content */}
  </div>
</section>
```

### Customize Solution Cards
```typescript
// Line ~289, modify this array
{[
  { icon: Zap, title: 'Lightning Fast', desc: 'Your custom desc' },
  // ... more cards
].map((item, idx) => {
  // Component render
})}
```

---

## 🔍 Debugging

### Check Remotion Player Loading
```typescript
// Look for Suspense fallback in DevTools
// If animations don't play, check browser console for errors
```

### Performance Issues
1. Open DevTools → Performance tab
2. Record page scroll
3. Look for long frames (120ms+)
4. Check if Remotion is the bottleneck

### Mobile Responsiveness
```bash
# Test at different breakpoints
Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
```

---

## 📊 Performance Targets

| Metric | Target | How to Check |
|--------|--------|-------------|
| FCP | < 1.5s | Lighthouse audit |
| LCP | < 2.5s | Core Web Vitals |
| CLS | < 0.1 | No layout shifts |
| Bundle | < 200KB | DevTools Network tab |

---

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Run Type Checking
```bash
npm run typecheck
```

### Run Tests
```bash
npm run test
npm run test:e2e
```

### Lighthouse Audit
```bash
# In Chrome DevTools → Lighthouse
# Target: 90+ all metrics
```

---

## 🚢 Deployment

### Pre-deployment Checklist
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Lighthouse audit > 90 all metrics
- [ ] Mobile responsive test passes
- [ ] Remotion animations load correctly
- [ ] All CTAs functional

### Deploy Command
```bash
# If using Vercel
vercel deploy --prod

# If using traditional host
npm run build
# Upload .next/ + public/ + node_modules/
```

---

## 📱 Mobile Considerations

### Responsive Breakpoints
```typescript
// Grid automatically adapts
gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'

// This equals:
// Desktop (1200px+): 4 columns
// Tablet (768px): 2-3 columns
// Mobile (375px): 1 column
```

### Touch Interactions
- Buttons: 44px minimum height (easy tap target)
- No hover-only content
- Swipe support built into Remotion Player

---

## 🔗 API Endpoints (Future)

```typescript
// Contact form submission
POST /api/contact
Body: { email, name, message }

// Lead creation (audit request)
POST /api/leads
Body: { email, company, phone }
```

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Remotion Docs**: https://www.remotion.dev/docs
- **React 19 Guide**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 💡 Tips & Tricks

### Quick Page Reload
```bash
Soft refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
```

### Debug Remotion Animations
```typescript
// Add logging
const frame = useCurrentFrame();
console.log('Frame:', frame);

// Slow down in player (DevTools)
// Speed: 0.25x for frame-by-frame inspection
```

### Extract Colors
```bash
# Use browser DevTools
# Right-click element → Inspect
# Copy computed background-color
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Remotion not loading | Check browser console, ensure Suspense boundary |
| Layout shift on mobile | Check padding/margin, use container queries |
| Slow animations | Reduce frame count, check GPU acceleration |
| Build fails | Run `npm install` again, clear `.next/` |

---

## ✅ Code Quality

### ESLint
```bash
npm run lint --fix  # Auto-fix issues
```

### TypeScript
```bash
npm run typecheck  # Full type analysis
```

### Format Code
```bash
# Using Prettier (if configured)
npx prettier --write app/\(site\)/page.tsx
```

---

## 📞 Support

- **Questions**: Check `/docs/VANTUS_HOMEPAGE_GUIDE.md`
- **Design Issues**: Refer to `/docs/VANTUS_HOMEPAGE_STITCH.md`
- **Technical Help**: Check ESLint/TypeScript output

---

**Last Updated**: March 17, 2026  
**Version**: 1.0.0
