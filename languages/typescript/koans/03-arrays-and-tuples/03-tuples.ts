// title: Tuples
// intro: A tuple is an array with a fixed length and a type for each position. Positions can have names, be optional, or gather the rest.
const entry: [string, number] = ['tea', 3];
expectTypeOf(entry[0]).toEqualTypeOf<___>(); // each position has its type
expectTypeOf(entry.length).toEqualTypeOf<___>(); // and the length is part of the type
type Range = [start: number, end?: number];
const open: Range = [5];
expectTypeOf<Range['length']>().toEqualTypeOf<___>(); // an optional position
expect(open[1], 'and it is missing here').toBe(___);
type Command = [name: string, ...args: number[]];
const move: Command = ['move', 10, 20];
expectTypeOf(move[1]).toEqualTypeOf<___>(); // a rest position
