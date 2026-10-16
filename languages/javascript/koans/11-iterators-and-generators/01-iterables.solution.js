const it = [10, 20][Symbol.iterator]();
expect(it.next(), 'next gives the first value').toEqual({ value: 10, done: false });
expect(it.next().value, 'then the next').toBe(20);
expect(it.next().done, 'and then says it is done').toBe(true);
expect([...new Map([['a', 1]])], 'a Map iterates over its entries').toEqual([['a', 1]]);
expect(typeof {}[Symbol.iterator], 'a plain object is not iterable').toBe('undefined');
