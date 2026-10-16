const a = [2, 3];
a.push(4);
expect(a, 'push adds to the end').toEqual([2, 3, 4]);
a.unshift(1);
expect(a, 'unshift adds to the start').toEqual([1, 2, 3, 4]);
expect(a.pop(), 'pop removes and returns the last item').toBe(4);
expect(a.shift(), 'shift removes and returns the first').toBe(1);
expect(a, 'what is left').toEqual([2, 3]);
expect(a.at(-1), 'at(-1) is the last item').toBe(3);
