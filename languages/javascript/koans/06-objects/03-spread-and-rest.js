// title: Spread and rest
// intro: Spreading an object with `...` copies its properties into a new one, later properties winning. In destructuring, `...rest` gathers the properties not taken.
const base = { a: 1, b: 2 };
expect({ ...base, b: 3 }, 'later properties win').toEqual(___);
expect(base.b, 'and the original is left alone').toBe(___);
const { a, ...others } = { a: 1, b: 2, c: 3 };
expect(others, '...others gathers the rest').toEqual(___);
const original = { list: [1] };
const copy = { ...original };
copy.list.push(2);
expect(original.list, 'spread copies one level: both share the list').toEqual(___);
