// title: Copying arrays
// intro: Spreading makes a shallow copy. `with` and `toSpliced` return changed copies and leave the original alone; `structuredClone` copies all the way down.
const a = [1, 2, 3];
const b = [...a];
b.push(4);
expect(a, 'spread copies the array').toEqual(___);
expect(a.with(0, 9), 'with returns a copy with one item changed').toEqual(___);
expect(a.toSpliced(1, 1), 'toSpliced returns a copy with items removed').toEqual(___);
const nested = [[1], [2]];
const shallow = [...nested];
shallow[0].push('!');
expect(nested[0], 'a shallow copy shares the inner arrays').toEqual(___);
const deep = structuredClone(nested);
deep[1].push('?');
expect(nested[1], 'structuredClone does not').toEqual(___);
