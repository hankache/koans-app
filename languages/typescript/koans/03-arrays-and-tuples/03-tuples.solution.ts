const entry: [string, number] = ['tea', 3];
expectTypeOf(entry[0]).toEqualTypeOf<string>(); // each position has its type
expectTypeOf(entry.length).toEqualTypeOf<2>(); // and the length is part of the type
type Range = [start: number, end?: number];
const open: Range = [5];
expectTypeOf<Range['length']>().toEqualTypeOf<1 | 2>(); // an optional position
expect(open[1], 'and it is missing here').toBe(undefined);
type Command = [name: string, ...args: number[]];
const move: Command = ['move', 10, 20];
expectTypeOf(move[1]).toEqualTypeOf<number>(); // a rest position
