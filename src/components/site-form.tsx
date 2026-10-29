'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useApp } from './providers';
import { buildWhatsAppUrl, contactSchema, listingSchema, type FormPayload } from '@/lib/forms';
import { cities } from '@/lib/data';

declare global { interface Window { grecaptcha?: { render: (el: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => number; getResponse: (id?: number) => string; reset: (id?: number) => void }; onesimusCaptchaReady?: () => void } }
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
export function SiteForm({ mode }: { mode: 'listing' | 'contact' }) {
  const { t, locale, consent } = useApp();
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<number | null>(null);
  const captchaEnabled = Boolean(siteKey) && consent === 'all';
  useEffect(() => {
    // Reset the token when consent or locale changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken('');
    if (!captchaEnabled || !captchaRef.current) return;
    const container = captchaRef.current;
    let cancelled = false;
    const render = () => { if (cancelled || !window.grecaptcha || !container) return; container.innerHTML = ''; widgetRef.current = window.grecaptcha.render(container, { sitekey: siteKey, callback: setToken, 'expired-callback': () => setToken(''), 'error-callback': () => setToken('') }); };
    window.onesimusCaptchaReady = render;
    document.getElementById('onesimus-recaptcha')?.remove();
    const script = document.createElement('script');
    script.id = 'onesimus-recaptcha'; script.src = `https://www.google.com/recaptcha/api.js?onload=onesimusCaptchaReady&render=explicit&hl=${locale}`; script.async = true; script.defer = true;
    document.head.appendChild(script);
    if (window.grecaptcha) render();
    return () => { cancelled = true; delete window.onesimusCaptchaReady; script.remove(); container.innerHTML = ''; widgetRef.current = null; };
  }, [captchaEnabled, locale]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus(''); setUrl(''); setError(false);
    const form = new FormData(event.currentTarget);
    const raw = { name: String(form.get('name') || ''), email: String(form.get('email') || ''), phone: String(form.get('phone') || ''), message: String(form.get('message') || ''), consent: form.get('consent') === 'on', company: String(form.get('company') || ''), captchaToken: token,
      ...(mode === 'listing' ? { kind: String(form.get('kind') || 'repair'), listingName: String(form.get('listingName') || ''), city: String(form.get('city') || ''), area: String(form.get('area') || ''), source: String(form.get('source') || '') } : {}) };
    const parsed = (mode === 'listing' ? listingSchema : contactSchema).safeParse(raw);
    if (!parsed.success) { setError(true); setStatus(t('formError')); return; }
    const payload = parsed.data as FormPayload;
    if (captchaEnabled && !token) { setError(true); setStatus(t('captchaError')); return; }
    setBusy(true);
    try {
      if (captchaEnabled) {
        const response = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, payload }) });
        const result = await response.json();
        if (!response.ok || !result.url) throw new Error(result.error || 'Verification failed');
        setUrl(result.url);
      } else setUrl(buildWhatsAppUrl(payload));
      setStatus(t('formPrepared'));
    } catch { setError(true); setStatus(t('formError')); if (widgetRef.current !== null) window.grecaptcha?.reset(widgetRef.current); setToken(''); }
    finally { setBusy(false); }
  };
  return <form className="site-form" onSubmit={submit}>
    <div className="field"><label htmlFor="name">{t('nameLabel')} *</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} /></div>
    <div className="field"><label htmlFor="email">{t('emailLabel')} *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={160} /></div>
    <div className="field field-wide"><label htmlFor="phone">{t('phoneLabel')}</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} /></div>
    {mode === 'listing' && <>
      <div className="field"><label htmlFor="kind">{t('kindLabel')} *</label><select id="kind" name="kind" required defaultValue="repair"><option value="repair">{t('listingTypeRepair')}</option><option value="group">{t('listingTypeGroup')}</option></select></div>
      <div className="field"><label htmlFor="listingName">{t('listingNameLabel')} *</label><input id="listingName" name="listingName" required minLength={2} maxLength={120} /></div>
      <div className="field"><label htmlFor="city">{t('city')} *</label><select id="city" name="city" required defaultValue=""><option value="" disabled>{t('city')}</option>{cities.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}<option value="Other">Other / Autre / Nyingine</option></select></div>
      <div className="field"><label htmlFor="area">{t('area')} *</label><input id="area" name="area" required minLength={2} maxLength={160} /></div>
      <div className="field field-wide"><label htmlFor="source">{t('websiteLabel')} *</label><input id="source" name="source" type="url" required maxLength={500} placeholder="https://" /></div>
    </>}
    <div className="field field-wide"><label htmlFor="message">{t('messageLabel')} *</label><textarea id="message" name="message" required minLength={10} maxLength={2500} rows={5} /></div>
    <div className="field-wide" style={{ position: 'absolute', left: '-10000px' }} aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
    <label className="form-check field-wide"><input type="checkbox" name="consent" required /><span>{t('consentLabel')} <Link href="/privacy" className="text-link" style={{ minHeight: 0 }}>{t('privacy')}</Link>.</span></label>
    {siteKey && consent !== 'all' && <p className="form-help field-wide">{t('captchaConsent')}</p>}
    {captchaEnabled && <div className="field-wide"><div ref={captchaRef} className="captcha-box" /></div>}
    {!siteKey && <p className="form-help field-wide">{t('captchaUnavailable')}</p>}
    <p className="form-help field-wide">{t('formPrivacy')}</p>
    {status && <p className={`form-status field-wide ${error ? 'error' : ''}`} role="status" aria-live="polite">{status}</p>}
    {url && <a className="submit-button field-wide" href={url} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp" aria-hidden="true" />{t('directWhatsapp')}</a>}
    <button className="submit-button field-wide" type="submit" disabled={busy}>{busy ? t('sending') : mode === 'listing' ? t('submitListing') : t('submitContact')}<i className="fa fa-angle-right" aria-hidden="true" /></button>
  </form>;
}
