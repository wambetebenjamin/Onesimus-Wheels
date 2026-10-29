'use client';
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { COOKIE_CONSENT, LOCALE_COOKIE, SAVES_KEY, PROFILE_KEY, listings } from '@/lib/data';
import { translate, type MessageKey } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

type Consent = 'all' | 'essential' | null;
type AppState = { locale: Locale; t: (key: MessageKey, vars?: Record<string, string | number>) => string; setLocale: (locale: Locale) => void; consent: Consent; setConsent: (value: Consent) => void; openConsent: () => void; consentOpen: boolean; saves: string[]; toggleSave: (slug: string) => void; profile: string; createProfile: (name: string) => void; closeProfile: () => void; deleteProfile: () => void; ready: boolean };
const AppContext = createContext<AppState | null>(null);
function readSaves(): string[] {
  try { const stored: unknown = JSON.parse(localStorage.getItem(SAVES_KEY) || '[]'); return Array.isArray(stored) ? stored.filter((slug): slug is string => typeof slug === 'string' && listings.some(item => item.slug === slug)) : []; } catch { return []; }
}
export function Providers({ children, locale }: { children: ReactNode; locale: Locale }) {
  const router = useRouter();
  const [consent, setConsentState] = useState<Consent>(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [saves, setSaves] = useState<string[]>([]);
  const [profile, setProfile] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${COOKIE_CONSENT}=`))?.split('=')[1];
    // Browser-only preferences are deliberately hydrated after SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cookie === 'all' || cookie === 'essential') setConsentState(cookie); else setConsentOpen(true);
    setSaves(readSaves());
    setProfile((localStorage.getItem(PROFILE_KEY) || '').slice(0, 40));
    setReady(true);
    const sync = (event: StorageEvent) => { if (event.key === SAVES_KEY || event.key === PROFILE_KEY || event.key === null) { setSaves(readSaves()); setProfile(localStorage.getItem(PROFILE_KEY) || ''); } };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const setConsent = useCallback((value: Consent) => {
    setConsentState(value); setConsentOpen(false);
    if (value) document.cookie = `${COOKIE_CONSENT}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }, []);
  const setLocale = (value: Locale) => { document.cookie = `${LOCALE_COOKIE}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; router.refresh(); };
  const persistSaves = (value: string[]) => { setSaves(value); localStorage.setItem(SAVES_KEY, JSON.stringify(value)); };
  const toggleSave = (slug: string) => persistSaves(saves.includes(slug) ? saves.filter(value => value !== slug) : [...saves, slug]);
  const createProfile = (name: string) => { const clean = name.trim().slice(0, 40); if (clean) { setProfile(clean); localStorage.setItem(PROFILE_KEY, clean); } };
  const closeProfile = () => { setProfile(''); localStorage.removeItem(PROFILE_KEY); };
  const deleteProfile = () => { closeProfile(); persistSaves([]); };
  return <AppContext.Provider value={{ locale, t: (key, vars) => translate(locale, key, vars), setLocale, consent, setConsent, consentOpen, openConsent: () => setConsentOpen(true), saves, toggleSave, profile, createProfile, closeProfile, deleteProfile, ready }}>{children}</AppContext.Provider>;
}
export function useApp() { const value = useContext(AppContext); if (!value) throw new Error('App provider is missing'); return value; }
