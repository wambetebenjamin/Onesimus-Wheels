import type { MetadataRoute } from 'next';
import { listings } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/repair', '/libraries', '/groups', '/safety', '/cities', '/list', '/about', '/contact', '/privacy', '/terms', '/image-credits'];
  const details = listings.map(item => `/${item.kind === 'library' ? 'libraries' : item.kind}/${item.slug}`);
  return [...routes, ...details].map(route => ({ url: `${base}${route}`, lastModified: new Date('2026-10-29'), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : 0.7 }));
}
