// PHP for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'php',
  name: 'PHP',
  tagline: 'Learn modern PHP from its arrays to its enums',
  testedWith: 'PHPUnit’s assertions, like `assertSame`',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#5b5a9a', dark: '#a9a8e8' },
    emblem:
      '<g fill="currentColor"><ellipse cx="34.6" cy="44" rx="7.2" ry="6.2"/><rect x="29.4" y="46" width="3.4" height="9" rx="1.2"/><rect x="36.6" y="46" width="3.4" height="9" rx="1.2"/><circle cx="27" cy="41.4" r="5.2"/></g><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M23.4 43.6 C22.2 47.4 22.8 51.2 26 52.8" stroke-width="3"/><path d="M41.6 42.6 Q43.4 44.4 42.6 47" stroke-width="1.4"/></g>',
  },
  about:
    'PHP is the language of the web’s servers: it runs WordPress, Wikipedia and frameworks like Laravel and Symfony. Modern PHP has types, classes, enums, closures and match expressions, a long way from its templating roots. These koans cover its values and strings, arrays, functions, classes and interfaces, enums, generators and errors.',
  site: { url: 'https://www.php.net', label: 'php.net' },
  sample: 'assertSame(2, 1 + 1);',
  worker: { url: 'runtime/php/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.php:3".
    line: /koan\.php:(\d+)/,
    // And starts it with the error: "Warning: Undefined variable $x", "TypeError: …".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
