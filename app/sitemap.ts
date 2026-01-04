import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thompsonsystems.com';

  const routes = [
    '',
    '/work',
    '/process',
    '/trust',
    '/contact',
    '/lab/revenue-leak',
  ];

  const workRoutes = siteConfig.featuredWork.map((project) => `/work/${project.slug}`);

  const allRoutes = [...routes, ...workRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
