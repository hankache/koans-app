// What LANGUAGE's interpreter really prints, read the way the result panel reads it.
// Copied from languages/_template: replace every LANGUAGE and lang-id, and write each TODO koan.
// languages/python/tap.test.ts has more cases worth copying.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('lang-id');

describe('parseRun on real LANGUAGE output', () => {
  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    const r = await report('TODO: a passing assertion\nTODO: an assertion given ___\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ n: 2, line: 2, blank: true });
  });

  test('a wrong answer shows the answer against what LANGUAGE computed', async () => {
    const r = await report('TODO: an equality assertion expecting 5 of something that is 4\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '5', actual: '4' });
  });

  test('an error outside any test points at its line', async () => {
    const r = await report('TODO: a passing assertion\nTODO: code that dies\n');
    expect(r).toMatchObject({ status: 'error', line: 2 });
  });

  test('each run starts from a fresh state', async () => {
    await report('TODO: define a variable\n');
    expect((await report('TODO: assert that the variable is not defined\n')).status).toBe('passed');
  });
});
