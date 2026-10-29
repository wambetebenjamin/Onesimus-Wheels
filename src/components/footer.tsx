'use client';
import Link from 'next/link';
import { useApp } from './providers';
import { WHATSAPP_NUMBER } from '@/lib/data';
export function Footer() {
  const { t, openConsent } = useApp();
  return <>
    <footer className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6"><Link href="/" className="footer-brand">{t('brand')}</Link><p className="footer-tagline">{t('tagline')}</p><p className="footer-description">{t('footerText')}</p><a className="text-link" style={{ color: '#fff' } } href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp" aria-hidden="true" />+{WHATSAPP_NUMBER}</a></div>
          <div className="col-lg-3 col-md-6"><h2 className="footer-heading">{t('footerExplore')}</h2><ul className="footer-links">{[['/repair','repair'],['/libraries','libraries'],['/groups','groups'],['/cities','cities'],['/safety','safety']].map(([href,key]) => <li key={href}><Link href={href}>{t(key as 'repair')}</Link></li>)}</ul></div>
          <div className="col-lg-4 col-md-6"><h2 className="footer-heading">{t('footerInfo')}</h2><ul className="footer-links">{[['/about','about'],['/list','list'],['/contact','contact'],['/saved','saved'],['/privacy','privacy'],['/terms','terms']].map(([href,key]) => <li key={href}><Link href={href}>{t(key as 'about')}</Link></li>)}</ul></div>
        </div>
        <p className="footer-disclaimer">{t('independent')}</p>
        <div className="footer-bottom"><span>© 2026 {t('rights')}</span><button type="button" onClick={openConsent}>{t('cookieSettings')}</button></div>
      </div>
    </footer>
    <div className="copyright_section"><div className="container"><p className="copyright_text">{t('templateCredit')} <Link href="/image-credits">{t('credits')}</Link>.</p></div></div>
  </>;
}
