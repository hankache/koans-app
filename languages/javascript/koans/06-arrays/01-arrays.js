// title: Arrays
// intro: An array holds values in order. `push` and `pop` work at its end, `unshift` and `shift` at its start.
const a = [2, 3];
a.push(4);
expect(a, 'push adds to the end').toEqual(___);
a.unshift(1);
expect(a, 'unshift adds to the start').toEqual(___);
expect(a.pop(), 'pop removes and returns the last item').toBe(___);
expect(a.shift(), 'shift removes and returns the first').toBe(___);
expect(a, 'what is left').toEqual(___);
expect(a.at(-1), 'at(-1) is the last item').toBe(___);
