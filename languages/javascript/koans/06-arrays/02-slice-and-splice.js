// title: Slice and splice
// intro: `slice` copies part of an array and leaves it alone; `splice` cuts items out of the array itself, and can insert others in their place.
const a = [1, 2, 3, 4, 5];
expect(a.slice(1, 3), 'slice copies a part').toEqual(___);
expect(a, 'and leaves the array alone').toEqual(___);
expect(a.splice(1, 2), 'splice cuts items out').toEqual(___);
expect(a, 'of the array itself').toEqual(___);
a.splice(1, 0, 'x');
expect(a, 'splice can insert, too').toEqual(___);
