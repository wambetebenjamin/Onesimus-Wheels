'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useApp } from './providers';
import { listings } from '@/lib/data';
import { ListingCard } from './listing-card';
export function SavedList() {
  const { t, saves, profile, createProfile, closeProfile, deleteProfile, ready } = useApp();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const items = listings.filter(item => saves.includes(item.slug));
  const submit = (event: FormEvent) => { event.preventDefault(); createProfile(name); setName(''); setMessage(t('profileCreated')); };
  const exportList = () => {
    const blob = new Blob([JSON.stringify({ profile, saved: items.map(item => ({ name: item.name, kind: item.kind, city: item.city, url: `/${item.kind === 'library' ? 'libraries' : item.kind}/${item.slug}` })) }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'onesimus-wheels-saved.json'; anchor.click(); URL.revokeObjectURL(url);
  };
  return <><div className="profile-panel">{profile ? <><h2>{profile}</h2><p>{t('profileNotice')}</p><div className="profile-actions"><button type="button" className="plain-button" onClick={closeProfile}>{t('signOut')}</button><button type="button" className="plain-button" onClick={() => { if (window.confirm(t('deleteProfile') + '?')) deleteProfile(); }}>{t('deleteProfile')}</button>{items.length > 0 && <button type="button" className="plain-button" onClick={exportList}>{t('exportSaves')}</button>}</div></> : <><h2>{t('profileTitle')}</h2><p>{t('profileText')}</p><form className="profile-form" onSubmit={submit}><div className="field"><label htmlFor="profile-name">{t('profileName')}</label><input id="profile-name" value={name} onChange={event => setName(event.target.value)} required minLength={2} maxLength={40} autoComplete="nickname" /></div><button className="submit-button" type="submit">{t('createProfile')}</button></form></>}{message && <p role="status">{message}</p>}</div>{!ready ? <p className="source-note">…</p> : items.length ? <div className="row">{items.map(item => <div className="col-lg-4 col-sm-6 mb-4" key={item.slug}><ListingCard listing={item} /></div>)}</div> : <div className="empty-state"><p>{t('emptySaves')}</p><Link className="submit-button" href="/repair">{t('explore')}</Link></div>}</>;
}
