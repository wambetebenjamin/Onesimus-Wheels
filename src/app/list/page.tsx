import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { SiteForm } from '@/components/site-form';
import { getLocale } from '@/lib/server-locale';
import { translate, type MessageKey } from '@/lib/i18n';
export const metadata: Metadata = { title: 'Add a listing' };
export default async function ListPage() {
  const locale = await getLocale(); const t = (key: MessageKey) => translate(locale, key);
  return <><PageBanner title="listTitle" intro="listIntro" image="/images/women-bicycle-workshop.jpg" /><section className="form-section"><div className="container form-layout"><SiteForm mode="listing" /><aside className="form-aside"><h2>{t('aboutSourcesTitle')}</h2><p>{t('aboutSources')}</p><p>{t('confirm')}</p></aside></div></section></>;
}
