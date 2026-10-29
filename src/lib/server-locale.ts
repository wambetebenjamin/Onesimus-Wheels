import { cookies } from 'next/headers';
import { LOCALE_COOKIE } from './data';
import type { Locale } from './types';
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return value === 'sw' || value === 'fr' ? value : 'en';
}
