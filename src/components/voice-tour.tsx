'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from './providers';
export function VoiceTour() {
  const { t, locale } = useApp();
  const pathname = usePathname();
  const [speaking, setSpeaking] = useState(false);
  const [status, setStatus] = useState('');
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  // Stop browser speech when the route or language changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); setSpeaking(false); setStatus(''); }, [pathname, locale]);
  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);
  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); setStatus(t('voiceStopped')); };
  const start = () => {
    if (!('speechSynthesis' in window)) { setStatus(t('voiceUnavailable')); return; }
    if (speaking) { stop(); return; }
    const main = document.getElementById('content');
    const text = (main?.querySelector('[data-voice-tour]')?.textContent || main?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 3500);
    if (!text) { setStatus(t('voiceUnavailable')); return; }
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.toLowerCase().startsWith(locale));
    if (voices.length > 0 && !voice) { setStatus(t('voiceUnsupported')); return; }
    const next = new SpeechSynthesisUtterance(text);
    next.lang = locale === 'sw' ? 'sw-KE' : locale === 'fr' ? 'fr-FR' : 'en-KE';
    if (voice) next.voice = voice;
    next.rate = 0.95;
    next.onend = () => { setSpeaking(false); setStatus(t('voiceStopped')); };
    next.onerror = () => { setSpeaking(false); setStatus(t('voiceUnavailable')); };
    utterance.current = next;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(next);
    setSpeaking(true); setStatus(t('voicePlaying'));
  };
  return <div><button type="button" className="voice-button" onClick={start} aria-pressed={speaking}><i className={`fa ${speaking ? 'fa-stop' : 'fa-volume-up'}`} aria-hidden="true" />{speaking ? t('stopListening') : t('listen')}</button><p className="voice-status" role="status" aria-live="polite">{status}</p></div>;
}
