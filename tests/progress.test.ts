// Two Progress objects on one IndexedDB and one BroadcastChannel name: two open tabs.
import 'fake-indexeddb/auto';
import { get } from 'idb-keyval';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { Progress } from '../src/lib/progress.svelte';

let tabs: Progress[] = [];
const openTab = async () => {
  const tab = new Progress('raku');
  await tab.init();
  tabs.push(tab);
  return tab;
};
const stored = () => get<Record<string, { status: string; attempts: number }>>('koans:raku:progress');

beforeEach(async () => {
  // Start each test from empty storage.
  await (await openTab()).resetAll();
  tabs.forEach(t => t.close());
  tabs = [];
});
afterEach(() => tabs.forEach(t => t.close()));

test("a tab's save doesn't erase what another tab saved", async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  await vi.waitFor(async () => expect((await stored())?.['numbers/arithmetic']).toBeDefined());
  b.record('strings/quoting', 'tried', false);
  await vi.waitFor(async () =>
    expect(await stored()).toMatchObject({
      'numbers/arithmetic': { status: 'passed' },
      'strings/quoting': { status: 'attempted' },
    }),
  );
});

test('tabs saving at the same moment keep both changes', async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  b.record('strings/quoting', 'tried', false);
  await vi.waitFor(async () => expect(Object.keys((await stored()) ?? {})).toHaveLength(2));
});

test('other tabs show a change without reloading', async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  await vi.waitFor(() => expect(b.get('numbers/arithmetic')?.status).toBe('passed'));
});

test('attempts are counted across tabs', async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'one', false);
  await vi.waitFor(() => expect(b.get('numbers/arithmetic')?.attempts).toBe(1));
  b.record('numbers/arithmetic', 'two', false);
  await vi.waitFor(async () => expect((await stored())?.['numbers/arithmetic'].attempts).toBe(2));
});

test('a tab opened later sees what was saved', async () => {
  const a = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  await vi.waitFor(async () => expect((await stored())?.['numbers/arithmetic']).toBeDefined());
  expect((await openTab()).get('numbers/arithmetic')?.status).toBe('passed');
});

test('starting over clears every tab', async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  await vi.waitFor(() => expect(b.get('numbers/arithmetic')).toBeDefined());
  await b.resetAll();
  await vi.waitFor(() => expect(a.get('numbers/arithmetic')).toBeUndefined());
  expect(await stored()).toEqual({});
});

test('resetting code keeps the status until the next run', async () => {
  const a = await openTab();
  a.record('numbers/arithmetic', 'solved', true);
  a.resetCode('numbers/arithmetic', 'is 1 + 1, ___;');
  await vi.waitFor(async () =>
    expect((await stored())?.['numbers/arithmetic']).toMatchObject({ status: 'passed', code: 'is 1 + 1, ___;' }),
  );
});

test('an import takes the newer entry for each koan, and every tab sees it', async () => {
  const a = await openTab();
  const b = await openTab();
  a.record('numbers/arithmetic', 'mine, newer', false);
  await vi.waitFor(async () => expect((await stored())?.['numbers/arithmetic']).toBeDefined());
  const old = { status: 'passed', code: 'old', attempts: 1, passedAt: '2020-01-01T00:00:00.000Z', updatedAt: '2020-01-01T00:00:00.000Z' } as const;
  const taken = await a.merge({ 'numbers/arithmetic': old, 'strings/quoting': old });
  expect(taken).toBe(1);
  expect(a.get('numbers/arithmetic')?.code).toBe('mine, newer');
  expect(a.get('strings/quoting')?.code).toBe('old');
  await vi.waitFor(() => expect(b.get('strings/quoting')?.status).toBe('passed'));
});
