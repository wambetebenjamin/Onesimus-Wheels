import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SaveButton } from './listing-card';
import { ListingCard } from './listing-card';
import { getLocale } from '@/lib/server-locale';
import { translate, pick, type MessageKey } from '@/lib/i18n';
import { listingBySlug, cityById, listings } from '@/lib/data';
import type { ListingKind } from '@/lib/types';
export async function ListingDetail({ kind, slug }: { kind: ListingKind; slug: string }) {
  const listing = listingBySlug(kind, slug);
  if (!listing) notFound();
  const locale = await getLocale(); const t = (key: MessageKey) => translate(locale, key);
  const city = cityById(listing.city);
  const base = kind === 'library' ? '/libraries' : `/${kind}`;
  const statusKey = listing.status === 'listed' ? 'statusListed' : listing.status === 'pilot' ? 'statusPilot' : 'statusConfirm';
  const related = listings.filter(item => item.city === listing.city && item.slug !== listing.slug).slice(0, 3);
  return <><section className="banner_section page-banner"><div className="container"><Link href={base} className="text-link" style={{ color: '#fff', marginBottom: 20 }}><i className="fa fa-angle-left" aria-hidden="true" />{t('back')}</Link><div className="row"><div className="col-md-7"><div className="image_1"><div className="hero-photo"><Image src={listing.image} alt={pick(listing.imageAlt, locale)} fill priority sizes="(max-width: 767px) 100vw, 58vw" /></div></div></div><div className="col-md-5"><div className="hero-copy" data-voice-tour><p className="banner_text">{city?.name}, {city ? pick(city.country, locale) : ''}</p><h1 className="banner_taital">{listing.name}</h1><p className="banner_text">{pick(listing.summary, locale)}</p></div></div></div></div></section>
    <section className="cycle_section"><div className="container"><div className="detail-layout"><div className="detail-copy"><h2>{t('details')}</h2><p>{pick(listing.detail, locale)}</p>{listing.rideNote && <div className="notice"><p><strong>{t('groups')}: </strong>{pick(listing.rideNote, locale)}</p></div>}<dl className="detail-facts"><div><dt>{t('area')}</dt><dd>{pick(listing.area, locale)}</dd></div><div><dt>{t('specialty')}</dt><dd>{listing.specialties.map(s => t(s as MessageKey)).join(', ')}</dd></div><div><dt>{t('source')}</dt><dd><a className="text-link" href={listing.sourceUrl} target="_blank" rel="noopener noreferrer">{listing.sourceLabel}<i className="fa fa-external-link" aria-hidden="true" /></a></dd></div><div><dt>{t('reviewed')}</dt><dd>29 October 2026</dd></div></dl><div className="detail-actions">{listing.contactUrl && <a className="submit-button" href={listing.contactUrl} target="_blank" rel="noopener noreferrer">{t('contactProvider')}</a>}<SaveButton slug={listing.slug} /></div><p className="status-note">{t(statusKey)}</p><div className="notice"><p>{t('confirm')}</p></div><p className="source-note">{t('photoNote')}</p></div><aside><div className="detail-photo"><Image src={listing.image} alt={pick(listing.imageAlt, locale)} fill sizes="(max-width: 991px) 100vw, 40vw" /></div><div className="notice"><p>{t('independent')}</p></div></aside></div>
    {related.length > 0 && <div style={{ marginTop: 55 }}><h2 className="cycle_taital">{city?.name}</h2><div className="row" style={{ marginTop: 30 }}>{related.map(item => <div className="col-lg-4 col-sm-6 mb-4" key={item.slug}><ListingCard listing={item} /></div>)}</div></div>}
    </div></section></>;
}
