// The languages the build tools know about. Each one is a folder in languages/ whose node.mjs
// describes it; adding a language means adding it here.
import javascript from '../../languages/javascript/node.mjs';
import lua from '../../languages/lua/node.mjs';
import python from '../../languages/python/node.mjs';
import raku from '../../languages/raku/node.mjs';
import ruby from '../../languages/ruby/node.mjs';
import typescript from '../../languages/typescript/node.mjs';

/**
 * @typedef {{ stream: 'out' | 'err', text: string }} OutputLine
 * @typedef {{ rc: number, lines: OutputLine[] }} Run
 * @typedef {{ version: string, run(src: string, stdin?: string): Run | Promise<Run> }} Engine
 * @typedef {object} Language
 * @property {string} id           used in paths and ids: 'raku'
 * @property {string} name         shown to people: 'Raku'
 * @property {string} dir          the language's folder (absolute, ending in /)
 * @property {string} extension    of koan files: '.raku'
 * @property {string} comment      starts a koan's header lines (# title: …): '#', '//'
 * @property {() => string} prelude  run before every koan
 * @property {string} epilogue     run after every koan
 * @property {(code: string) => string[]} lint  problems in a koan that running it can't reveal
 * @property {GithubZip | NpmPackage | NpmTarball} runtime  where the interpreter comes from; its `files` go into `out`
 * @property {() => Promise<Engine>} load  the interpreter, under Node
 */

/**
 * @typedef {{ kind?: 'github-zip', repo: string, asset: (tag: string) => string, files: string[], out: string }} GithubZip
 *   a zip attached to the GitHub releases of `repo`, with a .sha256 beside it
 * @typedef {{ kind: 'npm', package: string, files: string[], out: string }} NpmPackage
 *   an npm package in package.json, pinned by package-lock.json; `files` are paths in it, served
 *   under their base names
 * @typedef {{ kind: 'npm-tarball', package: string, files: string[], out: string }} NpmTarball
 *   an npm package downloaded from the registry, not installed: for packages too big for
 *   node_modules. `files` as for NpmPackage
 */

/** @type {Language[]} */
export const languages = [raku, python, javascript, typescript, ruby, lua];

/**
 * The languages named with --lang (repeat it, or separate names with commas), or else all of
 * them. Exits with a message for a name it doesn't know.
 */
export function chosenLanguages(args = process.argv.slice(2)) {
  const names = args.flatMap((a, i) => (a === '--lang' ? (args[i + 1] ?? '').split(',') : []));
  if (!names.length) return languages;
  return names.map(n => {
    const lang = languages.find(l => l.id === n);
    if (!lang) {
      console.error(`✗ unknown language "${n}"; known: ${languages.map(l => l.id).join(', ')}`);
      process.exit(1);
    }
    return lang;
  });
}
