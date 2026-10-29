import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/repair', '/libraries', '/groups', '/safety', '/cities', '/list', '/about', '/contact', '/privacy', '/terms', '/saved', '/image-credits', '/repair/zuzu-bike-shop', '/libraries/community-connect', '/groups/critical-mass-nairobi'];
for (const route of routes) {
  test(`page ${route} loads without overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1:visible').first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation and responsive contract', async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('link', { name: 'Repair', exact: true }).first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
});

test('directory filters and saves persist locally', async ({ page }) => {
  await page.goto('/repair');
  await page.getByLabel('City', { exact: true }).selectOption('nairobi');
  await expect(page.getByText('Zuzu Bike Shop & Service Centre')).toBeVisible();
  await page.getByRole('button', { name: /Save zuzu bike shop/ }).click();
  await page.goto('/saved');
  await expect(page.getByText('Zuzu Bike Shop & Service Centre')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Zuzu Bike Shop & Service Centre')).toBeVisible();
});

test('language switcher and cookie consent', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Essential only' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('#language').selectOption('sw');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sw');
  await expect(page.getByRole('heading', { name: 'Baiskeli inaweza kukufungulia jiji.' })).toBeVisible();
  await page.locator('#language').selectOption('fr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  const cookie = await page.context().cookies();
  expect(cookie.find(c => c.name === 'onesimus-wheels-cookie-consent')?.value).toBe('essential');
});

test('listing form prepares WhatsApp fallback honestly', async ({ page }) => {
  await page.goto('/list');
  await page.getByLabel('Your name').fill('Test Rider');
  await page.getByLabel('Email address').fill('rider@example.com');
  await page.getByLabel('Place or group name').fill('Community Repair Stand');
  await page.locator('#city').selectOption('Nairobi');
  await page.locator('#area').fill('Test area');
  await page.getByLabel('Public source or website').fill('https://example.com/source');
  await page.locator('#message').fill('A community repair stand with a public source to review.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare listing on WhatsApp' }).click();
  await expect(page.getByText('Your message is ready. Complete sending it in WhatsApp.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Use WhatsApp directly' })).toHaveAttribute('href', /wa\.me\/254112272061/);
});

test('home accessibility scan', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Essential only' }).click();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
