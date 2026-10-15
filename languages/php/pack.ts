// PHP for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'php',
  name: 'PHP',
  tagline: 'Learn modern PHP from its arrays to its enums',
  testedWith: 'PHPUnit’s assertions, like `assertSame`',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#5b5a9a', dark: '#a9a8e8' },
    emblem:
      '<g fill="{F}"><ellipse cx="35.5" cy="44.5" rx="10" ry="7.5"/><circle cx="24.5" cy="41.5" r="6.8"/><rect x="28.2" y="48" width="4.8" height="8.5" rx="1.6"/><rect x="38" y="48" width="4.8" height="8.5" rx="1.6"/></g><path d="M19.2 44.5 C17 49.5 18 53.5 22.5 55" fill="none" stroke="{F}" stroke-width="4.6" stroke-linecap="round"/><path d="M45.2 42 Q47.5 44 46.6 47.5" fill="none" stroke="{F}" stroke-width="1.6" stroke-linecap="round"/><path d="M27.5 36.5 C32.5 36.8 33 43 29.2 45.4" fill="none" stroke="{C}" stroke-width="1.5" stroke-linecap="round"/><circle cx="22.6" cy="39.8" r="1.1" fill="{C}"/>',
  },
  about:
    'PHP is the language of the web’s servers: it runs WordPress, Wikipedia and frameworks like Laravel and Symfony. Modern PHP has types, classes, enums, closures and match expressions, a long way from its templating roots. These koans cover its values and strings, arrays, functions, classes and interfaces, enums, generators and errors.',
  site: { url: 'https://www.php.net', label: 'php.net' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['The elephant remembers.', 'Another request, served.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'The engine behind much of the web',
  journey: 'From arrays to enums, generators and the new pipe operator.',
  framework: 'PHPUnit',
  kinds: ['web'],
  teasers: [
    { before: 'assertSame(', after: ', \'5\' + \'5\');', choices: ['\'55\'', '10', '\'10\''], answer: '10', why: '+ is for numbers; strings join with a dot.' },
    { before: 'assertSame(', after: ', 0 == \'a\');', choices: ['true', 'false', 'null'], answer: 'false', why: 'Since PHP 8, this compares them as strings.' },
  ],
  worker: { url: 'runtime/php/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.php:3".
    line: /koan\.php:(\d+)/,
    // And starts it with the error: "Warning: Undefined variable $x", "TypeError: …".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
