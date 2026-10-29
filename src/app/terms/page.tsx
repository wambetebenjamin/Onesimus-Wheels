import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { getLocale } from '@/lib/server-locale';
import { translate } from '@/lib/i18n';
import { termsSections } from '@/lib/legal';
export const metadata: Metadata = { title: 'Terms of use' };
export default async function TermsPage() { const locale = await getLocale(); return <><PageBanner title="termsTitle" intro="termsIntro" /><section className="cycle_section"><div className="container prose"><p className="source-note">{translate(locale, 'legalUpdated')}</p>{termsSections(locale).map(section => <article key={section.heading}><h2>{section.heading}</h2>{section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></section></>; }
