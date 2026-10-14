// title: Template literal types
// intro: Template literal types build string types the way template literals build strings. With unions inside, they make every combination.
type Greeting = `hello ${string}`;
const g: Greeting = 'hello world';
expect(g, 'any string after hello').toBe(___);
type Size = 's' | 'm';
type Color = 'red' | 'blue';
expectTypeOf<`${Size}-${Color}`>().toEqualTypeOf<___>(); // every combination
expectTypeOf<Uppercase<'koan'>>().toEqualTypeOf<___>(); // built-in string transformations
type EventName<T extends string> = `on${Capitalize<T>}`;
expectTypeOf<EventName<'click'>>().toEqualTypeOf<___>(); // used in a generic
type Version = `${number}.${number}`;
expectTypeOf<'6.0'>().toExtend<___>(); // a pattern a string can match
