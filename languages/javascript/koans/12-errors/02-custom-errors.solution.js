class ValidationError extends Error {
  constructor(field) {
    super(`${field} is invalid`);
    this.name = 'ValidationError';
    this.field = field;
  }
}
const check = age => {
  if (age < 0) throw new ValidationError('age');
  return age;
};
expect(() => check(-1), 'throw your own error').toThrow(ValidationError);
expect(() => check(-1), 'with its message').toThrow('age is invalid');
let error;
try {
  check(-5);
} catch (e) {
  error = e;
}
expect(error.field, 'it can carry data').toBe('age');
expect(String(error), 'name shows in the message').toBe('ValidationError: age is invalid');
expect(error, 'and it is still an Error').toBeInstanceOf(Error);
