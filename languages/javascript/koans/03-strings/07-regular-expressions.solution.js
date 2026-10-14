expect(/^\d+$/.test('2026'), 'test asks whether it matches').toBe(true);
expect(/abc/i.test('ABC'), 'the i flag ignores case').toBe(true);
expect('order 42 shipped'.match(/\d+/)[0], 'match finds the first match').toBe('42');
expect([...'a1b22c333'.matchAll(/\d+/g)].map(m => m[0]), 'matchAll finds them all').toEqual(['1', '22', '333']);
expect('2026-10'.match(/(?<year>\d{4})-(?<month>\d\d)/).groups.month, 'named groups').toBe('10');
expect('John Smith'.replace(/(\w+) (\w+)/, '$2, $1'), 'replace can reorder groups').toBe('Smith, John');
expect('a1b2', 'toMatch takes a pattern').toMatch(/\d/);
