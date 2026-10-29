import { z } from 'zod';
import { WHATSAPP_NUMBER } from './data';
const base = {
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  phone: z.string().trim().max(30).optional().default(''),
  message: z.string().trim().min(10).max(2500),
  consent: z.literal(true),
  company: z.string().max(0).optional().default(''),
  captchaToken: z.string().max(4096).optional().default(''),
};
export const contactSchema = z.object(base);
export const listingSchema = z.object({
  ...base,
  kind: z.enum(['repair', 'group']),
  listingName: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(80),
  area: z.string().trim().min(2).max(160),
  source: z.url().max(500).refine(value => /^https?:\/\//i.test(value), 'Use a public http or https source'),
});
export type ContactPayload = z.infer<typeof contactSchema>;
export type ListingPayload = z.infer<typeof listingSchema>;
export type FormPayload = ContactPayload | ListingPayload;
export function buildWhatsAppUrl(payload: FormPayload) {
  const lines = 'kind' in payload
    ? [`Onesimus Wheels listing suggestion`, `Type: ${payload.kind}`, `Place or group: ${payload.listingName}`, `City: ${payload.city}`, `Area: ${payload.area}`, `Source: ${payload.source}`, `From: ${payload.name} (${payload.email}${payload.phone ? `, ${payload.phone}` : ''})`, '', payload.message]
    : [`Onesimus Wheels contact`, `From: ${payload.name} (${payload.email}${payload.phone ? `, ${payload.phone}` : ''})`, '', payload.message];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
