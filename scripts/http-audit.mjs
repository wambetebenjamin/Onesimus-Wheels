const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const routes = ['/', '/repair', '/libraries', '/groups', '/safety', '/cities', '/list', '/about', '/contact', '/privacy', '/terms', '/saved', '/image-credits', '/repair/zuzu-bike-shop', '/libraries/community-connect', '/groups/critical-mass-nairobi', '/sitemap.xml', '/robots.txt', '/image-credits.md'];
let failed = false;
for (const route of routes) {
  const response = await fetch(base + route);
  const text = await response.text();
  const problems = [];
  if (response.status !== 200) problems.push(`status ${response.status}`);
  if (text.includes('—')) problems.push('em dash');
  if (/lorem ipsum/i.test(text)) problems.push('placeholder');
  if (route.endsWith('.jpg') || route === '/') {
    for (const match of text.matchAll(/src="(\/_next\/image\?[^"]+)"/g)) {
      const url = base + match[1].replaceAll('&amp;', '&');
      const image = await fetch(url);
      if (!image.ok) problems.push(`image ${image.status}`);
    }
  }
  if (problems.length) { failed = true; console.error(route, problems.join(', ')); }
  else console.log(route, response.status, 'ok');
}
const home = await fetch(base).then(r => r.text());
for (const required of ['254112272061', 'Onesimus Wheels', 'template/css/site.css']) if (!home.includes(required)) { failed = true; console.error('Missing', required); }
const headers = await fetch(base).then(r => r.headers);
for (const header of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy']) if (!headers.get(header)) { failed = true; console.error('Missing header', header); }
if (failed) process.exit(1);
console.log('HTTP audit passed.');
