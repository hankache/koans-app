// Go for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'go',
  name: 'Go',
  tagline: 'Learn Go from its zero values to its goroutines',
  testedWith: { name: 'testify', url: 'https://github.com/stretchr/testify' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  // Go's: a ball on the move, with speed lines behind it.
  look: {
    accent: { light: '#00718a', dark: '#5ccbe3' },
    emblem:
      '<circle cx="37" cy="44" r="7.5" fill="{F}"/><circle cx="39.4" cy="41.6" r="1.6" fill="{C}"/><path d="M20 39.5 H27.5 M22 44 H27 M20 48.5 H27.5" fill="none" stroke="{F}" stroke-width="2.2" stroke-linecap="round"/>',
  },
  about:
    'Go is a small, statically typed, compiled language, built for simple and reliable software: fast builds, a garbage collector, and concurrency with goroutines and channels in the language itself. It runs much of the cloud, from Docker and Kubernetes to countless web services and command-line tools. These koans cover its types and zero values, strings and runes, slices and maps, structs, methods and interfaces, errors, generics and iterators, goroutines and channels, and testing itself.',
  site: { url: 'https://go.dev', label: 'go.dev' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Clear is better than clever.', 'It compiled, and it passed.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Simple, fast, and concurrent',
  journey: 'From zero values and slices to interfaces, generics and goroutines.',
  framework: 'testify',
  kinds: ['web', 'automate'],
  teasers: [
    { before: 'assert.Equal(t, ', after: ', 7/2)', choices: ['3', '3.5', '4'], answer: '3', why: '/ on two integers gives an integer: the remainder is dropped.' },
    { context: 's := []int{10, 20, 30, 40}', before: 'assert.Equal(t, ', after: ', s[1:3])', choices: ['[]int{20, 30}', '[]int{10, 20, 30}', '[]int{20, 30, 40}'], answer: '[]int{20, 30}', why: 's[1:3] takes the items from index 1 up to, but not including, index 3.' },
    { before: 'assert.Equal(t, ', after: ', len("héllo"))', choices: ['5', '6', '4'], answer: '6', why: 'len counts bytes, and é takes two in UTF-8.' },
  ],
  // The koan as a file of its test framework, named its way (slices_test.go), on the editor's bar.
  testFile: slug => `${slug.replaceAll('-', '_')}_test.go`,
  worker: { url: 'runtime/go/worker.js', type: 'module' },
  errors: {
    // The compiler's errors and a panic's trace name the koan's file: "koan_test.go:12:5: …", "	koan_test.go:12 +0x2".
    line: /koan_test\.go:(\d+)/,
    // The compiler's message without its place, or the panic's first line.
    message: lines => {
      const first = lines.find(l => l.trim()) ?? '';
      return first.replace(/^koan_test\.go:\d+(:\d+)?: /, '').replace(/ \[recovered\]$/, '');
    },
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
