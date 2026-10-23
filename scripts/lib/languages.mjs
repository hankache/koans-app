// The languages the build tools know about. Each one is a folder in languages/ whose node.mjs
// describes it; adding a language means adding it here.
import clojure from '../../languages/clojure/node.mjs';
import javascript from '../../languages/javascript/node.mjs';
import lua from '../../languages/lua/node.mjs';
import ocaml from '../../languages/ocaml/node.mjs';
import php from '../../languages/php/node.mjs';
import r from '../../languages/r/node.mjs';
import python from '../../languages/python/node.mjs';
import raku from '../../languages/raku/node.mjs';
import ruby from '../../languages/ruby/node.mjs';
import scheme from '../../languages/scheme/node.mjs';
import sql from '../../languages/sql/node.mjs';
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
 * @property {string} [commentEnd]  ends them, for a language whose comments must close: '*)'
 * @property {'all' | 'called'} [codeNames]  which names in its code count as code words (code-words.mjs)
 * @property {() => string} prelude  run before every koan
 * @property {string} epilogue     run after every koan
 * @property {(code: string) => string[] | Promise<string[]>} lint  problems in a koan that running it can't reveal
 * @property {GithubZip | NpmPackage | NpmTarball | GithubFiles} runtime  where the interpreter comes from; its `files` go into `out`
 * @property {string[]} [onDemand]  files (or folders, ending in /) in public/runtime/<id>/ that the
 *   browser loads only when needed, if ever: left out of the size the loading bar counts to. Source
 *   maps, licenses and package.json files are left out anyway
 * @property {() => Promise<Engine>} load  the interpreter, under Node
 */

/**
 * @typedef {{ kind?: 'github-zip', repo: string, asset: (tag: string) => string, files: string[], out: string }} GithubZip
 *   a zip attached to the GitHub releases of `repo`, with a .sha256 beside it
 * @typedef {{ kind: 'npm', package: string, files: string[], out: string }} NpmPackage
 *   an npm package in package.json, pinned by package-lock.json; `files` are paths in it, served
 *   under their base names
 * @typedef {{ kind: 'npm-tarball', package: string, files: string[], out: string, strip?: string }} NpmTarball
 *   an npm package downloaded from the registry, not installed: for packages too big for
 *   node_modules. `files` as for NpmPackage, except that files under `strip` keep their folders
 *   below it
 * @typedef {{ kind: 'github-files', repo: string, path: string, files: string[], out: string, strip?: string }} GithubFiles
 *   files committed to the GitHub repository `repo`, at a pinned commit; `path` is the folder
 *   whose latest change --update moves to. `files` as for NpmTarball
 */

/** @type {Language[]} */
export const languages = [clojure, javascript, lua, ocaml, php, python, r, raku, ruby, scheme, sql, typescript];

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
