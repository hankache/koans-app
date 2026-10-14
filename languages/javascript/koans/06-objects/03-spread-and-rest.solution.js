const base = { a: 1, b: 2 };
expect({ ...base, b: 3 }, 'later properties win').toEqual({ a: 1, b: 3 });
expect(base.b, 'and the original is left alone').toBe(2);
const { a, ...others } = { a: 1, b: 2, c: 3 };
expect(others, '...others gathers the rest').toEqual({ b: 2, c: 3 });
const original = { list: [1] };
const copy = { ...original };
copy.list.push(2);
expect(original.list, 'spread copies one level: both share the list').toEqual([1, 2]);
