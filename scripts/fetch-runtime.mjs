// Gets each language's interpreter (or those named with --lang) into public/runtime/<id>/, as its
// languages/<id>/node.mjs says, and checks it against languages/<id>/runtime.lock.json:
//   • github-zip: downloaded from the project's GitHub releases, and checked against the checksum
//     published with the release too
//   • npm: copied from an npm package, pinned (and checked on install) by package-lock.json
//   • npm-tarball: downloaded from the npm registry without installing it (for packages too big
//     to install for everyone), checked against the integrity hash the registry publishes
//   • github-files: files committed to a GitHub repository, taken at a pinned commit (for
//     interpreters that are published nowhere else), checked against the lock alone
//
//   npm run fetch-runtime                                 the pinned interpreters, verified
//   npm run fetch-runtime -- --lang raku --update         move Raku to its latest release and re-pin it
//   npm run fetch-runtime -- --lang raku --update v5.1.0  move Raku to a given release
//   npm run fetch-runtime -- --lang python --update       re-pin Python to the installed package
//                                                         (after npm install pyodide@<version>)
//   npm run fetch-runtime -- --lang ruby --update [2.11.0]  move Ruby to the latest (or a given) version
//   npm run fetch-runtime -- --lang ocaml --update [<sha>]  move OCaml to the latest (or a given) commit
//
// After --update, run `npm run check:koans` and `npm test` before publishing.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { gunzipSync, inflateRawSync } from 'node:zlib';
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

/** Reads the named files (paths in the archive, like package/dist/ruby.wasm) out of a tar archive. */
function untar(tar, names) {
  const found = {};
  for (let p = 0; p + 512 <= tar.length; ) {
    const field = (start, length) => tar.toString('utf8', p + start, p + start + length).replace(/\0.*$/s, '');
    const name = field(0, 100);
    if (!name) break;
    const prefix = field(345, 155);
    const path = prefix ? `${prefix}/${name}` : name;
    const size = parseInt(field(124, 12).trim() || '0', 8);
    if (names.includes(path)) found[path] = tar.subarray(p + 512, p + 512 + size);
    p += 512 + Math.ceil(size / 512) * 512;
  }
  for (const n of names) if (!found[n]) die(`${n} is not in the package`);
  return found;
}

/** A package's tarball from the npm registry, checked against the registry's integrity hash. */
async function npmTarball({ package: pkg, files }, lock) {
  const registry = `https://registry.npmjs.org/${pkg.replace('/', '%2F')}`;
  const version = update ? (wantedTag ?? JSON.parse((await download(`${registry}/latest`)).toString()).version) : lock.tag;
  const { dist } = JSON.parse((await download(`${registry}/${version}`)).toString());
  const tgz = await download(dist.tarball);
  const [algorithm, expected] = dist.integrity.split(/-(.*)/s);
  if (createHash(algorithm).update(tgz).digest('base64') !== expected) die(`${pkg}@${version} does not match the registry's integrity hash`);
  const archive = sha256(tgz);
  if (!update && archive !== lock.archive) die(`${pkg}@${version} differs from the one pinned in the lock. Re-run with --update to accept it.`);
  console.log(`✓ ${pkg}@${version}  ${(tgz.length / 1e6).toFixed(1)} MB, integrity verified`);
  const inPackage = untar(gunzipSync(tgz), files.map(f => `package/${f}`));
  const found = Object.fromEntries(files.map(f => [f, inPackage[`package/${f}`]]));
  return { tag: version, source: `https://www.npmjs.com/package/${pkg}/v/${version}`, pin: { archive }, files: found };
}

/**
 * Files committed to a GitHub repository, at the commit pinned in the lock. With --update, the
 * latest commit that changed them, or the one given.
 */
async function githubFiles({ repo, path, files }, lock) {
  let commit = lock?.tag;
  if (update) {
    commit = wantedTag ?? JSON.parse((await download(`https://api.github.com/repos/${repo}/commits?path=${path}&per_page=1`)).toString())[0].sha;
  }
  const found = {};
  for (const file of files) found[file] = await download(`https://raw.githubusercontent.com/${repo}/${commit}/${file}`);
  const total = Object.values(found).reduce((sum, b) => sum + b.length, 0);
  console.log(`✓ ${repo}@${commit.slice(0, 12)}  ${files.length} files, ${(total / 1e6).toFixed(1)} MB`);
  return { tag: commit, source: `https://github.com/${repo}/tree/${commit}/${path}`, pin: {}, files: found };
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

  const got =
    kind === 'npm' ? npmPackage(lang.runtime)
    : kind === 'npm-tarball' ? await npmTarball(lang.runtime, lock)
    : kind === 'github-files' ? await githubFiles(lang.runtime, lock)
    : await githubZip(lang.runtime, lock);
  if (!update && got.tag !== lock.tag) {
    die(`${lang.id}: found ${got.tag} but ${lang.id}/runtime.lock.json pins ${lock.tag}. Re-run with --update to accept it.`);
  }

  const hashes = {};
  mkdirSync(out, { recursive: true });
  for (const file of FILES) {
    hashes[file] = sha256(got.files[file]);
    if (!update && hashes[file] !== lock.files[file]) die(`${file} differs from ${lang.id}/runtime.lock.json`);
    // Flat: a package's dist/acorn.mjs is served as acorn.mjs. With `strip`, files under that
    // prefix keep their folders (webR's dist/vfs/etc/… is served as vfs/etc/…).
    const strip = lang.runtime.strip;
    const target = out + (strip && file.startsWith(strip) ? file.slice(strip.length) : basename(file));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, got.files[file]);
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
