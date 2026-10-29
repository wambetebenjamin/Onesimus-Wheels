import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { Directory } from '@/components/directory';
import { getLocale } from '@/lib/server-locale';
import { translate } from '@/lib/i18n';
export const metadata: Metadata = { title: 'Cycling clubs and social rides' };
export default async function GroupsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams; const locale = await getLocale();
  return <><PageBanner title="groupsTitle" intro="groupsIntro" image="/images/community-ride.jpg" /><section className="cycle_section"><div className="container"><div className="notice"><p>{translate(locale, 'groupsNotice')}</p></div><Directory kind="group" initialCity={city} /></div></section></>;
}
