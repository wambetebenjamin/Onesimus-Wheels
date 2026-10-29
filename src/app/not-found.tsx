import Link from 'next/link';
import { getLocale } from '@/lib/server-locale';
import { translate } from '@/lib/i18n';
export default async function NotFound() { const locale = await getLocale(); return <section className="cycle_section layout_padding"><div className="container section-intro"><h1 className="cycle_taital">{translate(locale, 'notFoundTitle')}</h1><p className="cycle_text">{translate(locale, 'notFoundText')}</p><div className="section-link-row"><Link className="submit-button" href="/">{translate(locale, 'notFoundCta')}</Link></div></div></section>; }
