expect(Boolean(0), 'zero is falsy').toBe(false);
expect(Boolean('0'), 'a string with something in it is truthy').toBe(true);
expect([], 'an empty array is truthy, as toBeTruthy checks').toBeTruthy();
expect(Boolean([]), 'Boolean gives the same answer').toBe(true);
expect(Boolean(NaN), 'NaN is falsy').toBe(false);
expect(0 || 'default', '|| skips any falsy value').toBe('default');
expect(0 ?? 'default', '?? only skips null and undefined').toBe(0);
expect(!!'hello', '!! turns a value into its boolean').toBe(true);
