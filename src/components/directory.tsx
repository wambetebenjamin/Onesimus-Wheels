'use client';
import { useMemo, useState } from 'react';
import { useApp } from './providers';
import { cities, listings } from '@/lib/data';
import { pick, type MessageKey } from '@/lib/i18n';
import type { ListingKind } from '@/lib/types';
import { ListingCard } from './listing-card';
export function Directory({ kind, initialCity = '' }: { kind: ListingKind; initialCity?: string }) {
  const { t, locale } = useApp();
  const [city, setCity] = useState(cities.some(c => c.id === initialCity) ? initialCity : '');
  const [specialty, setSpecialty] = useState('');
  const [query, setQuery] = useState('');
  const items = useMemo(() => listings.filter(item => item.kind === kind), [kind]);
  const specialties = useMemo(() => Array.from(new Set(items.flatMap(item => item.specialties))).sort(), [items]);
  const filtered = items.filter(item => (!city || item.city === city) && (!specialty || item.specialties.includes(specialty)) && (!query || `${item.name} ${pick(item.area, locale)} ${pick(item.summary, locale)} ${item.specialties.join(' ')}`.toLowerCase().includes(query.toLowerCase())));
  const reset = () => { setCity(''); setSpecialty(''); setQuery(''); };
  return <><div className="directory-tools" role="search" aria-label={t('filters')}><div className="filter-grid"><div className="field"><label htmlFor="directory-search">{t('search')}</label><input id="directory-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></div><div className="field"><label htmlFor="directory-city">{t('city')}</label><select id="directory-city" value={city} onChange={event => setCity(event.target.value)}><option value="">{t('allCities')}</option>{cities.map(value => <option key={value.id} value={value.id}>{value.name}</option>)}</select></div><div className="field"><label htmlFor="directory-specialty">{t('specialty')}</label><select id="directory-specialty" value={specialty} onChange={event => setSpecialty(event.target.value)}><option value="">{t('allSpecialties')}</option>{specialties.map(value => <option key={value} value={value}>{t(value as MessageKey)}</option>)}</select></div></div></div><div className="filter-summary"><p role="status" aria-live="polite">{t('results', { count: filtered.length })}</p><button type="button" className="plain-button" onClick={reset}>{t('reset')}</button></div>{filtered.length ? <div className="row">{filtered.map(item => <div className="col-lg-4 col-sm-6 mb-4" key={item.slug}><ListingCard listing={item} /></div>)}</div> : <div className="empty-state"><p>{t('noResults')}</p><button type="button" className="submit-button" onClick={reset}>{t('reset')}</button></div>}<p className="source-note">{t('sourceNote')}</p></>;
}
