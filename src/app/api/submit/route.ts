import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema, listingSchema, buildWhatsAppUrl } from '@/lib/forms';
export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; reset: number }>();
function limited(ip: string) { const now = Date.now(); const entry = attempts.get(ip); if (!entry || entry.reset < now) { attempts.set(ip, { count: 1, reset: now + 60000 }); return false; } entry.count += 1; return entry.count > 8; }
export async function POST(request: NextRequest) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: 'Verification is not configured.' }, { status: 503 });
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }); }
  if (!body || typeof body !== 'object' || !('mode' in body) || !('payload' in body)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const { mode, payload } = body as { mode: string; payload: unknown };
  const parsed = (mode === 'listing' ? listingSchema : mode === 'contact' ? contactSchema : null)?.safeParse(payload);
  if (!parsed || !parsed.success) return NextResponse.json({ error: 'Invalid form details.' }, { status: 400 });
  if (parsed.data.company) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  if (!parsed.data.captchaToken) return NextResponse.json({ error: 'Verification required.' }, { status: 400 });
  try {
    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ secret, response: parsed.data.captchaToken, remoteip: ip }), signal: AbortSignal.timeout(8000) });
    const result = await verify.json() as { success?: boolean };
    if (!result.success) return NextResponse.json({ error: 'Verification failed.' }, { status: 400 });
  } catch { return NextResponse.json({ error: 'Verification unavailable.' }, { status: 502 }); }
  return NextResponse.json({ url: buildWhatsAppUrl(parsed.data) });
}
