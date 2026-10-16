// title: Async errors
// intro: A rejected promise is an async error: `.rejects` checks it, and inside an async function `try`/`catch` around an `await` catches it.
const fail = async () => {
  throw new TypeError('bad input');
};
await expect(fail(), '.rejects checks the rejection').rejects.toThrow(___);
let caught;
try {
  await fail();
} catch (error) {
  caught = error.message;
}
expect(caught, 'try/catch catches an awaited rejection').toBe(___);
await expect(Promise.any([Promise.reject(1)]), 'any fails only when all fail').rejects.toBeInstanceOf(___);
