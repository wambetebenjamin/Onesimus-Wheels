/* eslint-disable @next/next/no-css-tags */
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import { Chrome } from '@/components/chrome';
import { getLocale } from '@/lib/server-locale';
import './globals.css';


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Onesimus Wheels | Two wheels. More reach.', template: '%s | Onesimus Wheels' },
  description: 'Practical information for bicycle repair, bike libraries, cycling groups and safer riding across African cities.',
  applicationName: 'Onesimus Wheels',
  openGraph: { title: 'Onesimus Wheels', description: 'Two wheels. More reach.', siteName: 'Onesimus Wheels', type: 'website', images: ['/images/cyclist-kenya.jpg'] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#325662' };
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return <html lang={locale}><head><link rel="stylesheet" href="/template/css/bootstrap.min.css" /><link rel="stylesheet" href="/template/css/style.css" /><link rel="stylesheet" href="/template/css/responsive.css" /><link rel="stylesheet" href="/template/css/site.css" /></head><body><Providers locale={locale}><Chrome>{children}</Chrome></Providers></body></html>;
}
