import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/hero';
import { ListingCard } from '@/components/listing-card';
import { getLocale } from '@/lib/server-locale';
import { translate, pick, type MessageKey } from '@/lib/i18n';
import { byKind } from '@/lib/data';

export default async function Home() {
  const locale = await getLocale();
  const t = (key: MessageKey) => translate(locale, key);
  const features: { title: MessageKey; text: MessageKey; image: string; href: string; cta: MessageKey }[] = [
    { title: 'benefit1Title', text: 'benefit1Text', image: '/images/repair-stand-uganda.jpg', href: '/repair', cta: 'findRepair' },
    { title: 'benefit2Title', text: 'benefit2Text', image: '/images/woman-bicycle-uganda.jpg', href: '/libraries', cta: 'browseLibraries' },
    { title: 'benefit3Title', text: 'benefit3Text', image: '/images/community-ride.jpg', href: '/groups', cta: 'joinRide' },
  ];
  return <><Hero />
    <section className="cycle_section layout_padding"><div className="container"><div className="section-intro" data-voice-tour><h2 className="cycle_taital">{t('benefitsTitle')}</h2><p className="cycle_text">{t('benefitsIntro')}</p></div>{features.map((feature, index) => <div className={`cycle_section_2 ${index === 1 ? 'cycle_section_3' : ''}`} key={feature.title}><div className={`row feature-row ${index === 1 ? 'flex-md-row-reverse' : ''}`}><div className="col-md-6"><div className={index === 1 ? 'box_main_3' : 'box_main'}><h3 className={index === 1 ? 'number_text_2' : 'number_text'}>0{index + 1}</h3><div className="image_2"><div className="feature-photo"><Image src={feature.image} alt="" fill sizes="(max-width: 767px) 100vw, 45vw" /></div></div></div></div><div className="col-md-6"><h3 className="cycles_text">{t(feature.title)}</h3><p className="lorem_text">{t(feature.text)}</p><div className="btn_main"><div className="buy_bt"><Link href={feature.href}>{t(feature.cta)}</Link></div></div></div></div></div>)}</div></section>
    <section className="cycle_section layout_padding" style={{ paddingBottom: 70 }}><div className="container"><h2 className="cycle_taital">{t('howTitle')}</h2><p className="cycle_text">{t('howIntro')}</p><ol className="steps">{(['step1','step2','step3'] as MessageKey[]).map(key => <li className="step" key={key}><p>{t(key)}</p></li>)}</ol></div></section>
    <section className="about_section"><div className="container"><h2 className="about_taital">{t('rideSafeTitle')}</h2><p className="about_text">{t('rideSafeText')}</p><div className="about_main"><div className="image_5"><Image src="/images/cyclist-accra.jpg" alt="" fill sizes="(max-width: 767px) 90vw, 550px" /></div></div><div className="read_bt_1" style={{ textAlign: 'center' }}><Link href="/safety">{t('safetyCta')}</Link></div></div></section>
    <section className="news_section layout_padding"><div className="container"><h2 className="news_taital">{t('featuredTitle')}</h2><p className="news_text">{t('featuredIntro')}</p><div className="news_section_2"><div className="row">{byKind('repair').slice(0, 3).map(listing => <div className="col-lg-4 col-sm-6 mb-4" key={listing.slug}><ListingCard listing={listing} /></div>)}</div></div><div className="section-link-row"><Link className="submit-button" href="/repair">{t('viewAll')}</Link></div><p className="source-note" style={{ color: '#e0e7e8' }}>{pick({ en: 'Sources reviewed 29 October 2026. Confirm current details before visiting.', sw: 'Vyanzo vilipitiwa 29 Oktoba 2026. Thibitisha maelezo kabla ya kutembelea.', fr: 'Sources consultées le 29 octobre 2026. Confirmez les détails avant visite.' }, locale)}</p></div></section>
    <section className="cycle_section layout_padding"><div className="container section-intro"><h2 className="cycle_taital">{t('homeListTitle')}</h2><p className="cycle_text">{t('homeListText')}</p><div className="section-link-row"><Link className="submit-button" href="/list">{t('list')}</Link></div></div></section>
  </>;
}
