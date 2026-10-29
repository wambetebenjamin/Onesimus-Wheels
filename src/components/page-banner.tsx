import Image from 'next/image';
import { getLocale } from '@/lib/server-locale';
import { translate, type MessageKey } from '@/lib/i18n';
export async function PageBanner({ title, intro, image = '/images/cyclist-kenya.jpg' }: { title: MessageKey; intro: MessageKey; image?: string }) {
  const locale = await getLocale();
  const t = (key: MessageKey) => translate(locale, key);
  return <section className="banner_section page-banner"><div className="container"><div className="row"><div className="col-md-7"><div className="image_1"><div className="hero-photo"><Image src={image} alt="" fill priority sizes="(max-width: 767px) 100vw, 58vw" /></div></div></div><div className="col-md-5"><div className="hero-copy" data-voice-tour><h1 className="banner_taital">{t(title)}</h1><p className="banner_text">{t(intro)}</p></div></div></div></div></section>;
}
