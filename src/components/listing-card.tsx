'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from './providers';
import { cityById } from '@/lib/data';
import { pick, type MessageKey } from '@/lib/i18n';
import type { Listing } from '@/lib/types';
export function SaveButton({ slug }: { slug: string }) {
  const { t, saves, toggleSave } = useApp();
  const saved = saves.includes(slug);
  return <button type="button" className="save-button" aria-pressed={saved} aria-label={`${saved ? t('removeSave') : t('save')} ${slug.replaceAll('-', ' ')}`} onClick={() => toggleSave(slug)}><i className={`fa ${saved ? 'fa-bookmark' : 'fa-bookmark-o'}`} aria-hidden="true" />{saved ? t('savedItem') : t('save')}</button>;
}
export function ListingCard({ listing }: { listing: Listing }) {
  const { t, locale } = useApp();
  const city = cityById(listing.city);
  const statusKey = listing.status === 'listed' ? 'statusListed' : listing.status === 'pilot' ? 'statusPilot' : 'statusConfirm';
  return <article className="box_main_1"><div className="zoomout frame"><Image src={listing.image} alt={pick(listing.imageAlt, locale)} fill sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw" /></div><div className="padding_15"><p className="card-meta"><i className="fa fa-map-marker" aria-hidden="true" />{city?.name}, {city ? pick(city.country, locale) : ''}</p><h2 className="speed_text"><Link href={`/${listing.kind === 'library' ? 'libraries' : listing.kind}/${listing.slug}`}>{listing.name}</Link></h2><p className="post_text">{pick(listing.area, locale)}</p><p className="long_text">{pick(listing.summary, locale)}</p><div className="card-tags">{listing.specialties.slice(0, 3).map(specialty => <span className="card-tag" key={specialty}>{t(specialty as MessageKey)}</span>)}</div><p className="status-note">{t(statusKey)}</p><div className="card-actions"><Link className="text-link" href={`/${listing.kind === 'library' ? 'libraries' : listing.kind}/${listing.slug}`}>{t('details')}<i className="fa fa-angle-right" aria-hidden="true" /></Link><SaveButton slug={listing.slug} /></div></div></article>;
}
