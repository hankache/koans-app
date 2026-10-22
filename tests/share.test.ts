import { expect, test } from 'vitest';
import { decodeCode, encodeCode, MAX_SHARED } from '../src/lib/share';

test('code survives the round trip through a link', async () => {
  const code = "assert -7 // 2 == -3, 'down means toward minus infinity'\nsay 'héllo ✓';\n";
  const encoded = await encodeCode(code);
  expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  expect(await decodeCode(encoded)).toBe(code);
});

test('it is compressed: a koan makes a short link', async () => {
  const code = Array.from({ length: 7 }, (_, i) => `assert ${i} * 2 == ___, 'doubling ${i}'`).join('\n');
  expect((await encodeCode(code)).length).toBeLessThan(code.length);
});

test('a damaged link gives null, not an error', async () => {
  const encoded = await encodeCode('print(1)');
  for (const bad of [encoded.slice(0, -3), 'not*base64', '', 'AAAA']) expect(await decodeCode(bad)).toBeNull();
});

test('code longer than a koan is refused', async () => {
  expect(await decodeCode(await encodeCode('x'.repeat(MAX_SHARED + 1)))).toBeNull();
});
