expect(7 + 3, 'addition').toBe(10);
expect(7 - 10, 'subtraction').toBe(-3);
expect(2 ** 10, 'a power').toBe(1024);
expect(7 / 2, '/ divides exactly').toBe(3.5);
expect(Math.trunc(7 / 2), 'Math.trunc drops the fraction').toBe(3);
expect(7 % 3, '% is the remainder').toBe(1);
expect(-7 % 3, 'it keeps the sign of the left side').toBe(-1);
