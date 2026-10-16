const a = [1, 2, 3, 4, 5];
expect(a.slice(1, 3), 'slice copies a part').toEqual([2, 3]);
expect(a, 'and leaves the array alone').toEqual([1, 2, 3, 4, 5]);
expect(a.splice(1, 2), 'splice cuts items out').toEqual([2, 3]);
expect(a, 'of the array itself').toEqual([1, 4, 5]);
a.splice(1, 0, 'x');
expect(a, 'splice can insert, too').toEqual([1, 'x', 4, 5]);
