import { spawnSync, execSync } from 'node:child_process';
import fs from 'node:fs';
import zlib from 'node:zlib';
import chromium from '@sparticuz/chromium';
process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = await chromium.executablePath();
if (process.platform === 'linux') {
  const libDir = '/tmp/al2023/lib';
  if (!fs.existsSync(`${libDir}/libnspr4.so`)) {
    fs.mkdirSync('/tmp/al2023', { recursive: true });
    fs.writeFileSync('/tmp/al2023.tar', zlib.brotliDecompressSync(fs.readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
    execSync('tar -xf /tmp/al2023.tar -C /tmp/al2023');
  }
  process.env.LD_LIBRARY_PATH = `${libDir}:${process.env.LD_LIBRARY_PATH || ''}`;
}
const result = spawnSync('playwright', ['test', ...process.argv.slice(2)], { stdio: 'inherit', env: process.env });
process.exit(result.status ?? 1);
