// title: switch
// intro: `switch` compares its value with each `case` using `===`, and runs from the matching case until a `break`. Without one, it falls through to the next case.
const kind = x => {
  switch (x) {
    case 1:
      return 'one';
    case '1':
      return 'the string one';
    default:
      return 'something else';
  }
};
expect(kind('1'), 'cases compare with ===').toBe(___);
expect(kind(true), 'default catches the rest').toBe(___);
const steps = [];
switch ('b') {
  case 'a':
    steps.push('a');
  case 'b':
    steps.push('b');
  case 'c':
    steps.push('c');
    break;
  case 'd':
    steps.push('d');
}
expect(steps, 'without break, it falls through').toEqual(___);
const size = n => {
  switch (true) {
    case n < 10:
      return 'small';
    case n < 100:
      return 'medium';
    default:
      return 'large';
  }
};
expect(size(42), 'switch (true) tests conditions in order').toBe(___);
