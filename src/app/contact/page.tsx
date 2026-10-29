import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { SiteForm } from '@/components/site-form';
import { getLocale } from '@/lib/server-locale';
import { translate, type MessageKey } from '@/lib/i18n';
import { WHATSAPP_NUMBER } from '@/lib/data';
export const metadata: Metadata = { title: 'Contact' };
export default async function ContactPage() {
  const locale = await getLocale(); const t = (key: MessageKey) => translate(locale, key);
  return <><PageBanner title="contactTitle" intro="contactIntro" /><section className="form-section"><div className="container form-layout"><SiteForm mode="contact" /><aside className="form-aside"><h2>{t('waHelp')}</h2><p>{t('contactIntro')}</p><a className="submit-button" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp" aria-hidden="true" />+{WHATSAPP_NUMBER}</a><p>{t('independent')}</p></aside></div></section></>;
}
