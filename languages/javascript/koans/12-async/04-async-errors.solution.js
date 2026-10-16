const fail = async () => {
  throw new TypeError('bad input');
};
await expect(fail(), '.rejects checks the rejection').rejects.toThrow(TypeError);
let caught;
try {
  await fail();
} catch (error) {
  caught = error.message;
}
expect(caught, 'try/catch catches an awaited rejection').toBe('bad input');
await expect(Promise.any([Promise.reject(1)]), 'any fails only when all fail').rejects.toBeInstanceOf(AggregateError);
