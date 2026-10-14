expect(1 + 1, 'toBe compares values').toBe(2);
expect('Java' + 'Script', '+ joins strings').toBe('JavaScript');
expect([1, 2], 'toEqual compares contents').toEqual([1, 2]);
expect('cat', '.not turns an expectation around').not.toBe('dog');
expect(true && false, '&& wants both sides true').toBe(false);
expect('koan', 'toHaveLength checks a length').toHaveLength(4);
