import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { getLocale } from '@/lib/server-locale';
import { translate, type MessageKey } from '@/lib/i18n';
export const metadata: Metadata = { title: 'Practical safer riding' };
const blocks: { title: MessageKey; text: MessageKey; icon: string }[] = [
  { title: 'safetyLights', text: 'safetyLightsText', icon: 'fa-lightbulb-o' }, { title: 'safetyLocks', text: 'safetyLocksText', icon: 'fa-lock' }, { title: 'safetyRoad', text: 'safetyRoadText', icon: 'fa-road' }, { title: 'safetyCheck', text: 'safetyCheckText', icon: 'fa-wrench' }, { title: 'safetyWeather', text: 'safetyWeatherText', icon: 'fa-tint' }, { title: 'safetyGroup', text: 'safetyGroupText', icon: 'fa-users' },
];
const checks: MessageKey[] = ['checkAir','checkBrakes','checkWheels','checkChain','checkLights','checkRoute'];
export default async function SafetyPage() {
  const locale = await getLocale(); const t = (key: MessageKey) => translate(locale, key);
  return <><PageBanner title="safetyTitle" intro="safetyIntro" image="/images/cyclist-accra.jpg" /><section className="cycle_section"><div className="container"><div className="safety-grid">{blocks.map(block => <article className="safety-block" key={block.title}><h2><i className={`fa ${block.icon}`} aria-hidden="true" />{t(block.title)}</h2><p>{t(block.text)}</p></article>)}</div><div className="checklist"><h2>{t('checklist')}</h2>{checks.map((key, index) => <label key={key}><input type="checkbox" name={`check-${index}`} />{t(key)}</label>)}<small>{t('checklistNote')}</small></div><div className="notice"><p>{t('independent')}</p></div></div></section></>;
}
