// title: Error causes
// intro: `new Error(message, { cause })` wraps a lower-level error in a more helpful one, keeping the original in `cause`.
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
expect(failure.message, 'the helpful message').toBe(___);
expect(failure.cause, 'keeps the original').toBeInstanceOf(___);
