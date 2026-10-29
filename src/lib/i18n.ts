import type { Locale, Localized } from './types';
import { en, type MessageKey } from './messages/en';
import { sw } from './messages/sw';
import { fr } from './messages/fr';
export type { MessageKey };
export const locales: Locale[] = ['en', 'sw', 'fr'];
export const localeNames: Record<Locale, string> = { en: 'English', sw: 'Kiswahili', fr: 'Français' };
export const pick = (value: Localized, locale: Locale) => value[locale] || value.en;
export const messages = { en, sw, fr };
export function translate(locale: Locale, key: MessageKey, vars?: Record<string, string | number>) {
  let text = messages[locale][key] || en[key];
  if (vars) Object.entries(vars).forEach(([name, value]) => { text = text.replaceAll(`{${name}}`, String(value)); });
  return text;
}
