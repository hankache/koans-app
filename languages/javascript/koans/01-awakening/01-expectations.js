// title: Expectations
// intro: Koans are tested the way most JavaScript is tested: with Vitest's `expect`. `expect(value, 'why').toBe(expected)` wants the two to be the same; `toEqual` compares arrays and objects by their contents. Replace each `___` so every expectation passes.
expect(1 + 1, 'toBe compares values').toBe(___);
expect('Java' + 'Script', '+ joins strings').toBe(___);
expect([1, 2], 'toEqual compares contents').toEqual(___);
expect('cat', '.not turns an expectation around').not.toBe(___);
expect(true && false, '&& wants both sides true').toBe(___);
expect('koan', 'toHaveLength checks a length').toHaveLength(___);
