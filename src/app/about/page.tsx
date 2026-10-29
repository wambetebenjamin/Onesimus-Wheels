import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';
import { getLocale } from '@/lib/server-locale';
import { translate, type MessageKey } from '@/lib/i18n';
export const metadata: Metadata = { title: 'About' };
export default async function AboutPage() {
  const locale = await getLocale(); const t = (key: MessageKey) => translate(locale, key);
  const sections: { title: MessageKey; text: MessageKey }[] = [{ title: 'aboutStoryTitle', text: 'aboutStory' }, { title: 'aboutIndependentTitle', text: 'aboutIndependent' }, { title: 'aboutInclusiveTitle', text: 'aboutInclusive' }, { title: 'aboutSourcesTitle', text: 'aboutSources' }];
  return <><PageBanner title="aboutTitle" intro="aboutIntro" image="/images/woman-bicycle-uganda.jpg" /><section className="cycle_section"><div className="container prose">{sections.map(section => <article key={section.title}><h2>{t(section.title)}</h2><p>{t(section.text)}</p></article>)}<div className="detail-photo" style={{ marginTop: 35 }}><Image src="/images/women-bicycle-workshop.jpg" alt="" fill sizes="(max-width: 991px) 100vw, 850px" /></div><p className="source-note">{t('photoNote')}</p><div className="notice"><p>{t('independent')}</p></div></div></section></>;
}
