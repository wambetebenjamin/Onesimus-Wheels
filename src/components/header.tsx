'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useApp } from './providers';
import { locales, localeNames, type MessageKey } from '@/lib/i18n';
import { VoiceTour } from './voice-tour';

const primary: { href: string; key: MessageKey }[] = [
  { href: '/', key: 'home' }, { href: '/repair', key: 'repair' }, { href: '/libraries', key: 'libraries' }, { href: '/groups', key: 'groups' }, { href: '/safety', key: 'safety' }, { href: '/cities', key: 'cities' },
];
const secondary: { href: string; key: MessageKey }[] = [{ href: '/list', key: 'list' }, { href: '/about', key: 'about' }, { href: '/contact', key: 'contact' }];
export function Header() {
  const { t, locale, setLocale, saves } = useApp();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    const onClick = (event: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);
  const links = [...primary, ...secondary];
  return <div className="header_section header_bg">
    <nav className="navbar navbar-expand-lg navbar-light bg-light" aria-label={t('menu')}>
      <Link href="/" className="logo" aria-label={t('brand')}><span>Onesimus<small>Wheels</small></span></Link>
      <div className="header-tools">
        <Link href="/saved" className="header-saved" aria-label={`${t('saved')} (${saves.length})`}><i className="fa fa-bookmark-o" aria-hidden="true" /><span className="saved-label">{t('saved')}</span><span className="count">{saves.length}</span></Link>
        <label className="sr-only" htmlFor="language">{t('language')}</label>
        <select id="language" className="language-select" value={locale} onChange={event => setLocale(event.target.value as typeof locale)}>{locales.map(value => <option key={value} value={value}>{localeNames[value]}</option>)}</select>
      </div>
      <button ref={buttonRef} className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded={open} aria-label={open ? t('closeMenu') : t('menu')} onClick={() => setOpen(!open)}><i className={`fa ${open ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" /></button>
      <div ref={menuRef} className={`collapse navbar-collapse ${open ? 'is-open' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">{links.map(link => <li className="nav-item" key={link.href}><Link className="nav-link" onClick={() => setOpen(false)} href={link.href} aria-current={pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? 'page' : undefined}>{t(link.key)}</Link></li>)}</ul>
      </div>
    </nav>
    <div className="container"><div className="utility-row"><VoiceTour /></div></div>
  </div>;
}
