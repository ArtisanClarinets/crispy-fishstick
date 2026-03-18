import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vantus.systems'

  const primaryRoutes = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/services', priority: 0.9, freq: 'weekly' as const },
    { path: '/services/website-rebuild', priority: 0.8, freq: 'monthly' as const },
    { path: '/services/website-plus-cms', priority: 0.8, freq: 'monthly' as const },
    { path: '/services/website-plus-portal', priority: 0.8, freq: 'monthly' as const },
    { path: '/pricing', priority: 0.9, freq: 'monthly' as const },
    { path: '/proof', priority: 0.8, freq: 'monthly' as const },
    { path: '/proof/case-studies/fintech-dashboard', priority: 0.7, freq: 'monthly' as const },
    { path: '/proof/case-studies/healthtech-platform', priority: 0.7, freq: 'monthly' as const },
    { path: '/proof/case-studies/shopify-admin-sync', priority: 0.7, freq: 'monthly' as const },
    { path: '/standards', priority: 0.7, freq: 'monthly' as const },
    { path: '/learn', priority: 0.7, freq: 'weekly' as const },
    { path: '/learn/engineering/rigor-in-products', priority: 0.6, freq: 'monthly' as const },
    { path: '/learn/engineering/graphql-at-scale', priority: 0.6, freq: 'monthly' as const },
    { path: '/learn/design/designing-for-trust', priority: 0.6, freq: 'monthly' as const },
    { path: '/start-audit', priority: 0.95, freq: 'monthly' as const },
    { path: '/about', priority: 0.6, freq: 'monthly' as const },
    { path: '/contact', priority: 0.7, freq: 'monthly' as const },
    { path: '/status', priority: 0.3, freq: 'weekly' as const },
    { path: '/legal/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/legal/terms', priority: 0.3, freq: 'yearly' as const },
    { path: '/legal/cookies', priority: 0.3, freq: 'yearly' as const },
  ]

  return primaryRoutes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }))
}
