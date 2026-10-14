// title: Regular expressions
// intro: A regular expression, `/pattern/flags`, matches text. `test` asks whether it matches, `match` and `matchAll` find matches, and `replace` can use what groups captured.
expect(/^\d+$/.test('2026'), 'test asks whether it matches').toBe(___);
expect(/abc/i.test('ABC'), 'the i flag ignores case').toBe(___);
expect('order 42 shipped'.match(/\d+/)[0], 'match finds the first match').toBe(___);
expect([...'a1b22c333'.matchAll(/\d+/g)].map(m => m[0]), 'matchAll finds them all').toEqual(___);
expect('2026-10'.match(/(?<year>\d{4})-(?<month>\d\d)/).groups.month, 'named groups').toBe(___);
expect('John Smith'.replace(/(\w+) (\w+)/, '$2, $1'), 'replace can reorder groups').toBe(___);
expect('a1b2', 'toMatch takes a pattern').toMatch(___);
