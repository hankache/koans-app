// Copies THIRD-PARTY-NOTICES.md to the site as public/third-party-notices.txt, a plain text file:
// without the <details> tags that fold the license texts on GitHub, each fold's summary kept as a line.
import { readFileSync, writeFileSync } from 'node:fs';

const text = readFileSync('THIRD-PARTY-NOTICES.md', 'utf8')
  .replace(/^<\/?details>\n/gm, '')
  .replace(/^<summary>(.*)<\/summary>$/gm, '$1:');
writeFileSync('public/third-party-notices.txt', text);
