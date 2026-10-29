// The home page's "try one" koans, run through each language's real interpreter: the answer must
// pass, and every other choice must not.
import { describe, expect, test } from 'vitest';
import { packs } from '../languages';
import type { Teaser } from '../src/lib/language';
import { runner } from './run';

/** What a teaser is, as a whole program in its language, with `choice` in the blank. */
function program(id: string, t: Teaser, choice: string) {
  const code = `${t.context ? `${t.context}\n` : ''}${t.before}${choice}${t.after}\n`;
  // The teaser leaves out PHP's opening tag; the file needs it.
  if (id === 'php') return `<?php\n${code}`;
  // And Go's package, imports and test function.
  if (id === 'go') {
    return `package koans\n\nimport (\n\t"testing"\n\n\t"github.com/stretchr/testify/assert"\n)\n\nfunc TestTeaser(t *testing.T) {\n${code}}\n`;
  }
  return code;
}

for (const pack of packs) {
  describe(`${pack.name}'s teasers`, () => {
    test.each(pack.teasers.map((t, i) => [i + 1, t] as const))('teaser %i: the answer passes, the others fail', async (_, t) => {
      const { report } = await runner(pack.id);
      expect(t.choices).toContain(t.answer);
      expect((await report(program(pack.id, t, t.answer))).status).toBe('passed');
      for (const choice of t.choices.filter(c => c !== t.answer)) {
        const status = (await report(program(pack.id, t, choice))).status;
        if (status === 'passed') throw new Error(`${choice} passes too`);
      }
      // The first test of a language also starts its interpreter (R and Python take a while).
    }, 90_000);
  });
}
