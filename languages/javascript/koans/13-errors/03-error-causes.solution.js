function loadConfig(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('config is not valid JSON', { cause: error });
  }
}
let failure;
try {
  loadConfig('{bad');
} catch (error) {
  failure = error;
}
expect(failure.message, 'the helpful message').toBe('config is not valid JSON');
expect(failure.cause, 'keeps the original').toBeInstanceOf(SyntaxError);
