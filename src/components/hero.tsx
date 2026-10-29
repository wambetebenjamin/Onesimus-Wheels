'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useApp } from './providers';
import type { MessageKey } from '@/lib/i18n';
const slides: { image: string; alt: MessageKey; title: MessageKey; text: MessageKey; href: string; cta: MessageKey }[] = [
  { image: '/images/cyclist-kenya.jpg', alt: 'heroText1', title: 'heroTitle1', text: 'heroText1', href: '/repair', cta: 'findRepair' },
  { image: '/images/cargo-bike-lagos.jpg', alt: 'heroText2', title: 'heroTitle2', text: 'heroText2', href: '/repair', cta: 'explore' },
  { image: '/images/community-ride.jpg', alt: 'heroText3', title: 'heroTitle3', text: 'heroText3', href: '/groups', cta: 'joinRide' },
];
export function Hero() {
  const { t } = useApp();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Sync the initial browser motion preference before starting the timer.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); setReduced(query.matches); const change = () => setReduced(query.matches); query.addEventListener('change', change); return () => query.removeEventListener('change', change); }, []);
  useEffect(() => { if (paused || reduced) return; const timer = window.setInterval(() => setIndex(value => (value + 1) % slides.length), 7000); return () => window.clearInterval(timer); }, [paused, reduced]);
  const go = (value: number) => { setIndex((value + slides.length) % slides.length); setPaused(true); };
  return <section className="banner_section layout_padding" aria-roledescription="carousel" aria-label={t('brand')} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)}>
    <div id="main_slider" className="carousel slide"><div className="carousel-inner">{slides.map((slide, i) => <div key={slide.title} className={`carousel-item ${i === index ? 'active' : ''}`} aria-hidden={i !== index}>
      <div className="container"><div className="row"><div className="col-md-7"><div className="best_text">{t('heroEyebrow')}</div><div className="image_1"><div className="hero-photo"><Image src={slide.image} alt={t(slide.alt)} fill priority={i === 0} sizes="(max-width: 767px) 100vw, 58vw" /></div></div></div><div className="col-md-5"><div className="hero-copy"><h1 className="banner_taital">{t(slide.title)}</h1><p className="banner_text">{t(slide.text)}</p><div className="contact_bt"><Link href={slide.href} tabIndex={i === index ? 0 : -1}>{t(slide.cta)}</Link></div></div></div></div></div>
    </div>)}</div>
    <div className="container"><div className="carousel-controls"><button type="button" onClick={() => go(index - 1)} aria-label={t('previous')}><i className="fa fa-angle-left" aria-hidden="true" /></button>{slides.map((slide, i) => <button key={slide.title} type="button" className="slide-dot" aria-label={t('slide', { number: i + 1 })} aria-pressed={i === index} onClick={() => go(i)} />)}<button type="button" onClick={() => go(index + 1)} aria-label={t('next')}><i className="fa fa-angle-right" aria-hidden="true" /></button><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? t('play') : t('pause')}><i className={`fa ${paused ? 'fa-play' : 'fa-pause'}`} aria-hidden="true" /></button></div></div></div>
  </section>;
}
