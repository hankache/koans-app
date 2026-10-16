const SYMBOLS = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const roman = n => {
  let out = '';
  for (const [value, symbol] of SYMBOLS) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
};
expect(roman(3), 'the same symbol repeats').toBe('III');
expect(roman(4), 'one before five').toBe('IV');
expect(roman(14), 'ten, then four').toBe('XIV');
expect(roman(1994), 'a year').toBe('MCMXCIV');
expect(roman(0), 'the Romans had no zero').toBe('');
