import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { Directory } from '@/components/directory';
import { getLocale } from '@/lib/server-locale';
import { translate } from '@/lib/i18n';
export const metadata: Metadata = { title: 'Bike libraries and share schemes' };
export default async function LibrariesPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams; const locale = await getLocale();
  return <><PageBanner title="librariesTitle" intro="librariesIntro" image="/images/woman-bicycle-uganda.jpg" /><section className="cycle_section"><div className="container"><div className="notice"><p>{translate(locale, 'libraryNotice')}</p></div><Directory kind="library" initialCity={city} /></div></section></>;
}
