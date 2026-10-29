import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageBanner } from '@/components/page-banner';
import { getLocale } from '@/lib/server-locale';
import { translate, pick, type MessageKey } from '@/lib/i18n';
import { cities, listings } from '@/lib/data';
export const metadata: Metadata = { title: 'Cities' };
export default async function CitiesPage() {
  const locale = await getLocale(); const t = (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars);
  return <><PageBanner title="citiesTitle" intro="citiesIntro" /><section className="news_section"><div className="container"><h2 className="news_taital">{t('cityCoverage')}</h2><p className="news_text">{t('coverageNote')}</p><div className="news_section_2"><div className="row">{cities.map(city => { const items = listings.filter(item => item.city === city.id); return <div className="col-lg-4 col-sm-6 mb-4" key={city.id}><article className="box_main_1 city-card"><div className="frame"><Image src={city.image} alt={pick(city.imageAlt, locale)} fill sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw" /></div><div className="padding_15"><h3 className="speed_text">{city.name}</h3><p className="post_text">{pick(city.country, locale)}</p><p className="long_text">{pick(city.note, locale)}</p><div className="city-stats"><span>{items.filter(i => i.kind === 'repair').length} {t('repair')}</span><span>{items.filter(i => i.kind === 'library').length} {t('libraries')}</span><span>{items.filter(i => i.kind === 'group').length} {t('groups')}</span></div><Link className="text-link" href={`/repair?city=${city.id}`}>{t('openCity', { city: city.name })}<i className="fa fa-angle-right" aria-hidden="true" /></Link></div></article></div>; })}</div></div></div></section></>;
}
