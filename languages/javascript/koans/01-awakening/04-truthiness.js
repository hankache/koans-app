// title: Truthiness
// intro: Any value can stand in for a boolean. `false`, `0`, `''`, `null`, `undefined` and `NaN` are falsy; everything else is truthy. `toBeTruthy` and `toBeFalsy` test exactly that.
expect(Boolean(0), 'zero is falsy').toBe(___);
expect(Boolean('0'), 'a string with something in it is truthy').toBe(___);
expect([], 'an empty array is truthy, as toBeTruthy checks').toBeTruthy();
expect(Boolean([]), 'Boolean gives the same answer').toBe(___);
expect(Boolean(NaN), 'NaN is falsy').toBe(___);
expect(0 || 'default', '|| skips any falsy value').toBe(___);
expect(0 ?? 'default', '?? only skips null and undefined').toBe(___);
expect(!!'hello', '!! turns a value into its boolean').toBe(___);
