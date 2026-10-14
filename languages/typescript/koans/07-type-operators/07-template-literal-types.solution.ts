type Greeting = `hello ${string}`;
const g: Greeting = 'hello world';
expect(g, 'any string after hello').toBe('hello world');
type Size = 's' | 'm';
type Color = 'red' | 'blue';
expectTypeOf<`${Size}-${Color}`>().toEqualTypeOf<'s-red' | 's-blue' | 'm-red' | 'm-blue'>(); // every combination
expectTypeOf<Uppercase<'koan'>>().toEqualTypeOf<'KOAN'>(); // built-in string transformations
type EventName<T extends string> = `on${Capitalize<T>}`;
expectTypeOf<EventName<'click'>>().toEqualTypeOf<'onClick'>(); // used in a generic
type Version = `${number}.${number}`;
expectTypeOf<'6.0'>().toExtend<Version>(); // a pattern a string can match
