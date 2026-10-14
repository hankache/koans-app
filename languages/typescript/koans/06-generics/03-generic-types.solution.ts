interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 7 };
expectTypeOf(numberBox.value).toEqualTypeOf<number>(); // Box<number> holds a number
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
const failed: Result<number> = { ok: false, error: new Error('no') };
if (!failed.ok) {
  expectTypeOf(failed.error).toEqualTypeOf<Error>(); // E took its default
}
class Stack<T> {
  #items: T[] = [];
  push(item: T) {
    this.#items.push(item);
    return this;
  }
  pop() {
    return this.#items.pop();
  }
}
expect(new Stack<string>().push('a').push('b').pop(), 'a generic class').toBe('b');
