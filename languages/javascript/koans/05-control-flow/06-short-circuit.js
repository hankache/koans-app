// title: Short-circuit operators
// intro: `&&` and `||` return one of their operands, not just `true` or `false`, and stop as soon as the answer is known. `??` falls back only on `null` and `undefined`.
expect('cat' && 'dog', '&& gives the last operand when all are truthy').toBe(___);
expect(0 && 'dog', 'or the first falsy one').toBe(___);
expect('' || 'default', '|| gives the first truthy one').toBe(___);
expect(0 ?? 'default', '?? keeps 0').toBe(___);
let calls = 0;
const touch = () => ++calls;
false && touch();
true || touch();
expect(calls, 'the right side may never run').toBe(___);
const settings = { theme: '' };
settings.theme ||= 'dark';
settings.size ??= 12;
expect(settings, '||= and ??= assign only when needed').toEqual(___);
