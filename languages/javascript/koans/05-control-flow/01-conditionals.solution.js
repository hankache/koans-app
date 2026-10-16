const grade = score => {
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else return 'C';
};
expect(grade(95), 'the first true condition wins').toBe('A');
expect(grade(85), 'else if tries the next one').toBe('B');
expect(grade(10), 'else catches the rest').toBe('C');
const sign = n => (n > 0 ? 'positive' : n < 0 ? 'negative' : 'zero');
expect(sign(-3), 'ternaries can be chained').toBe('negative');
expect(sign(0), 'down to the last one').toBe('zero');
let label = 'empty';
if ('0') label = 'full';
expect(label, "a non-empty string is truthy, even '0'").toBe('full');
