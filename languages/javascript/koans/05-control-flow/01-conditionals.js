// title: Conditionals
// intro: `if`/`else if`/`else` picks the first branch whose condition is truthy. The ternary `c ? a : b` does the same inside an expression.
const grade = score => {
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else return 'C';
};
expect(grade(95), 'the first true condition wins').toBe(___);
expect(grade(85), 'else if tries the next one').toBe(___);
expect(grade(10), 'else catches the rest').toBe(___);
const sign = n => (n > 0 ? 'positive' : n < 0 ? 'negative' : 'zero');
expect(sign(-3), 'ternaries can be chained').toBe(___);
expect(sign(0), 'down to the last one').toBe(___);
let label = 'empty';
if ('0') label = 'full';
expect(label, "a non-empty string is truthy, even '0'").toBe(___);
