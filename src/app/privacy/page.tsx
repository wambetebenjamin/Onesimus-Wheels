import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { getLocale } from '@/lib/server-locale';
import { translate } from '@/lib/i18n';
import { privacySections } from '@/lib/legal';
export const metadata: Metadata = { title: 'Privacy notice' };
export default async function PrivacyPage() { const locale = await getLocale(); return <><PageBanner title="privacyTitle" intro="privacyIntro" /><section className="cycle_section"><div className="container prose"><p className="source-note">{translate(locale, 'legalUpdated')}</p>{privacySections(locale).map(section => <article key={section.heading}><h2>{section.heading}</h2>{section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></section></>; }
