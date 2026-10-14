// Gets each language's interpreter (or those named with --lang) into public/runtime/<id>/, as its
// languages/<id>/node.mjs says, and checks it against languages/<id>/runtime.lock.json:
//   • github-zip: downloaded from the project's GitHub releases, and checked against the checksum
//     published with the release too
//   • npm: copied from an npm package, pinned (and checked on install) by package-lock.json
//
//   npm run fetch-runtime                                 the pinned interpreters, verified
//   npm run fetch-runtime -- --lang raku --update         move Raku to its latest release and re-pin it
//   npm run fetch-runtime -- --lang raku --update v5.1.0  move Raku to a given release
//   npm run fetch-runtime -- --lang python --update       re-pin Python to the installed package
//                                                         (after npm install pyodide@<version>)
//
// After --update, run `npm run check:koans` and `npm test` before publishing.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { chosenLanguages } from './lib/languages.mjs';

const args = process.argv.slice(2);
const update = args.includes('--update');
const wantedTag = update && !args[args.indexOf('--update') + 1]?.startsWith('--') ? args[args.indexOf('--update') + 1] : undefined;
const sha256 = buf => createHash('sha256').update(buf).digest('hex');
const die = msg => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'koans-app' } });
  if (!res.ok) die(`${url}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Reads the named files out of a zip archive (stored or deflated entries). */
function unzip(zip, names) {
  let eocd = zip.length - 22;
  while (eocd >= 0 && zip.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) die('not a zip archive');
  const count = zip.readUInt16LE(eocd + 10);
  let p = zip.readUInt32LE(eocd + 16);
  const found = {};
  for (let i = 0; i < count; i++) {
    const method = zip.readUInt16LE(p + 10);
    const size = zip.readUInt32LE(p + 20);
    const nameLen = zip.readUInt16LE(p + 28);
    const skip = nameLen + zip.readUInt16LE(p + 30) + zip.readUInt16LE(p + 32);
    const local = zip.readUInt32LE(p + 42);
    const name = zip.toString('utf8', p + 46, p + 46 + nameLen);
    const base = name.split('/').pop();
    if (names.includes(base)) {
      const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
      const data = zip.subarray(start, start + size);
      found[base] = method === 0 ? data : method === 8 ? inflateRawSync(data) : die(`${name}: unsupported compression`);
    }
    p += 46 + skip;
  }
  for (const n of names) if (!found[n]) die(`${n} is not in the release archive`);
  return found;
}

const langs = chosenLanguages(args);
if (update && (langs.length !== 1 || !args.includes('--lang'))) die('--update moves one language at a time: add --lang <id>');

/** A release zip from GitHub, checked against its published checksum. */
async function githubZip({ repo, asset, files }, lock) {
  let tag = lock?.tag;
  if (update) {
    tag = wantedTag ?? JSON.parse((await download(`https://api.github.com/repos/${repo}/releases/latest`)).toString()).tag_name;
  }
  const name = asset(tag);
  const base = `https://github.com/${repo}/releases/download/${tag}/${name}`;
  const zip = await download(base);
  const published = (await download(`${base}.sha256`)).toString().trim().split(/\s+/)[0];
  const zipHash = sha256(zip);
  if (zipHash !== published) die(`${name} does not match the checksum published with the release`);
  if (!update && zipHash !== lock.zip) {
    die(`${name} differs from the one pinned in the lock. Re-run with --update to accept it, then npm run check:koans.`);
  }
  console.log(`✓ ${name}  ${(zip.length / 1e6).toFixed(1)} MB, checksum verified`);
  return { tag, source: `https://github.com/${repo}/releases/tag/${tag}`, pin: { zip: zipHash }, files: unzip(zip, files) };
}

/** Files from an installed npm package. */
function npmPackage({ package: pkg, files }) {
  if (wantedTag) die(`--update takes no version for an npm package: npm install ${pkg}@<version> first`);
  const require = createRequire(import.meta.url);
  const root = dirname(require.resolve(`${pkg}/package.json`));
  const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  console.log(`✓ ${pkg} ${version} from node_modules (checked by npm against package-lock.json)`);
  const found = Object.fromEntries(files.map(f => [f, readFileSync(join(root, f))]));
  return { tag: version, source: `https://www.npmjs.com/package/${pkg}/v/${version}`, pin: {}, files: found };
}

for (const lang of langs) {
  const { kind = 'github-zip', files: FILES, out } = lang.runtime;
  const lockPath = lang.dir + 'runtime.lock.json';
  const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, 'utf8')) : null;
  if (!update && !lock) {
    die(`${lang.id}/runtime.lock.json has nothing pinned: run \`npm run fetch-runtime -- --lang ${lang.id} --update\` once.`);
  }

  const got = kind === 'npm' ? npmPackage(lang.runtime) : await githubZip(lang.runtime, lock);
  if (!update && got.tag !== lock.tag) {
    die(`${lang.id}: found ${got.tag} but ${lang.id}/runtime.lock.json pins ${lock.tag}. Re-run with --update to accept it.`);
  }

  const hashes = {};
  mkdirSync(out, { recursive: true });
  for (const file of FILES) {
    hashes[file] = sha256(got.files[file]);
    if (!update && hashes[file] !== lock.files[file]) die(`${file} differs from ${lang.id}/runtime.lock.json`);
    writeFileSync(out + file, got.files[file]);
    console.log(`✓ ${file}  ${(got.files[file].length / 1e6).toFixed(1)} MB`);
  }

  const { version } = await lang.load();
  console.log(`✓ ${lang.name} interpreter ${version}`);

  if (update) {
    const pinned = { source: got.source, tag: got.tag, version, ...got.pin, files: hashes };
    writeFileSync(lockPath, JSON.stringify(pinned, null, 2) + '\n');
    console.log(`✓ ${lang.id}/runtime.lock.json now pins ${got.tag}. Run npm run check:koans and npm test before publishing.`);
  }
}
