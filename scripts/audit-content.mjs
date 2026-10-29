import fs from 'node:fs';
import path from 'node:path';
const roots = ['src', 'public/images', 'image-credits.md'];
const banned = [/—/g, /lorem ipsum/gi, /AI-generated image/gi, /unsplash/gi, /gettyimages/gi, /shutterstock/gi];
const files = [];
function walk(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (/\.(tsx?|css|md)$/.test(entry.name)) files.push(full); } }
for (const root of roots) { if (fs.statSync(root).isDirectory()) walk(root); else files.push(root); }
let failed = false;
for (const file of files) { const text = fs.readFileSync(file, 'utf8'); for (const pattern of banned) { pattern.lastIndex = 0; if (pattern.test(text) && !(file === 'image-credits.md' && pattern.source.includes('AI-generated'))) { console.error(`Content audit failed: ${file} matches ${pattern}`); failed = true; } } }
const data = fs.readFileSync('src/lib/data.ts', 'utf8');
for (const required of ['254112272061', 'onesimus-wheels-cookie-consent', 'nairobi', 'kampala', 'kigali', 'accra', 'lagos', 'cape-town']) if (!data.includes(required)) { console.error(`Missing required value: ${required}`); failed = true; }
const images = fs.readdirSync('public/images').filter(file => /\.(jpg|jpeg|png|webp)$/.test(file));
const credits = fs.readFileSync('image-credits.md', 'utf8');
for (const image of images) if (!credits.includes(image)) { console.error(`Missing image credit: ${image}`); failed = true; }
if (failed) process.exit(1);
console.log(`Content audit passed: ${files.length} files, ${images.length} credited photographs, no em dashes or placeholder copy.`);
