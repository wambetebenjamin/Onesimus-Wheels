'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { useApp } from './providers';
import { WHATSAPP_NUMBER } from '@/lib/data';
export function Chrome({ children }: { children: ReactNode }) {
  const { t, consent, setConsent, consentOpen } = useApp();
  return <div className={consentOpen ? 'has-cookie-banner' : ''}>
    <a className="skip-link" href="#content">{t('skip')}</a>
    <Header />
    <main id="content" tabIndex={-1}>{children}</main>
    <Footer />
    <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label={t('whatsapp')}><i className="fa fa-whatsapp" aria-hidden="true" /><span>{t('whatsapp')}</span></a>
    {consentOpen && <section className="cookie-banner" role="region" aria-label={t('cookieTitle')}><div className="cookie-inner"><div className="cookie-copy"><h2>{t('cookieTitle')}</h2><p>{t('cookieText')} <Link href="/privacy">{t('privacy')}</Link>.</p></div><div className="cookie-actions"><button type="button" onClick={() => setConsent('all')}>{t('acceptAll')}</button><button type="button" className="secondary" onClick={() => setConsent('essential')}>{t('essentialOnly')}</button></div></div></section>}
    <span className="sr-only" data-consent={consent || 'unset'} />
  </div>;
}
