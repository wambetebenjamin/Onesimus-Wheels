# Onesimus Wheels

Two wheels. More reach.

Practical information for bicycle repair, bike libraries, cycling groups and safer riding across African cities.

## Stack

- Next.js 16.4.3, React 19.3.1, TypeScript 5.9.3
- Tailwind CSS 4.3.3 with the supplied Cycle template CSS, fonts, palette and animations
- Node 24 (`.nvmrc`)
- Zod validation, Google reCAPTCHA v2 when configured
- Vercel `cdg1` region and security headers

## Local development

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Build gate

```bash
npm run gate
```

This runs lint, TypeScript, content/photo-credit audit and the production build.

Browser checks:

```bash
npx playwright install chromium
npm test
```

## Environment

See `.env.example`.

- `NEXT_PUBLIC_WHATSAPP_NUMBER` defaults to `254112272061`.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` enable server-verified reCAPTCHA on listing/contact forms.
- `NEXT_PUBLIC_SITE_URL` sets canonical metadata and sitemap origin.

Without reCAPTCHA keys, forms do not pretend to verify. They prepare a direct WhatsApp message and clearly say no message has been sent until the user completes it in WhatsApp.

## Design fidelity

The uploaded `Cycle-v1.0.0.zip` remains in the repository. Its CSS, font families, color variables, section classes, carousel behavior and hover transitions are preserved in `public/template` and the page components. Content and photography were replaced for Onesimus Wheels. The original template's warm accent and angled header are part of the supplied design, not added AI decoration.

The template's original jQuery plugin bundle contained an external tracking script. It is not loaded. The carousel, menu, voice tour and consent UI are implemented in React using the same visual classes and transitions.

## Content and safety

- Six city hubs: Nairobi, Kampala, Kigali, Accra, Lagos and Cape Town.
- Repair, library/share and group listings include source links and confirmation notes.
- Missing library coverage is stated rather than invented.
- Independent-information disclaimer appears globally.
- Saved places/groups are device-local only. There is no live tracking, public profile or analytics dashboard.
- Voice tour uses browser speech synthesis with a text fallback.
- Cookie consent name: `onesimus-wheels-cookie-consent`.

## Images

Real Pexels photographs only, stored in `public/images/` and credited in `image-credits.md` and `/image-credits`. No AI-generated images or watermarked stock.

## Deployment

`vercel.json` pins `cdg1`, `npm ci` and `npm run build`. Connect the GitHub repository to Vercel, set environment variables, and deploy the `main` branch. Security headers are configured in `next.config.ts`.
