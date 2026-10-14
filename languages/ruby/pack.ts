// Ruby for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'ruby',
  name: 'Ruby',
  tagline: 'Learn Ruby from its objects to its blocks',
  testedWith: 'Minitest’s assertions, like `assert_equal`',
  look: { monogram: 'Rb', accent: { light: '#9a6535', dark: '#d49a66' } },
  sample: 'assert_equal 2, 1 + 1',
  teaser: { before: 'assert_equal ', after: ', -7 % 3', choices: ['-1', '1', '2'], answer: '2', why: 'Ruby’s % takes the sign of the divisor.' },
  worker: { url: 'runtime/ruby/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.rb:3".
    line: /koan\.rb:(\d+)/,
    // And starts it with the error: "NameError: undefined local variable or method 'x' for main".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
