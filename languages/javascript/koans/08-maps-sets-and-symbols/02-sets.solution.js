const s = new Set([1, 1, 2, 3]);
expect(s.size, 'duplicates collapse').toBe(3);
expect(s.has(2), 'has asks for a value').toBe(true);
s.delete(1);
expect([...s], 'delete removes one').toEqual([2, 3]);
expect([...new Set('hello')], 'a set of the letters, in order').toEqual(['h', 'e', 'l', 'o']);
expect([...new Set([3, 1, 3, 2, 1])], 'a quick way to drop duplicates').toEqual([3, 1, 2]);
