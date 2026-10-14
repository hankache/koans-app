// title: Generic types
// intro: Interfaces, type aliases and classes can take type parameters too, with defaults if you like.
interface Box<T> {
  value: T;
}
const box: Box<number> = { value: 1 };
assert.type<___>(box.value, 'Box<number> holds a number');
type Pair<T> = [T, T];
assert.typeEqual<Pair<string>, ___>('a generic type alias');
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}
const stack = new Stack<string>();
stack.push('a');
assert.type<___>(stack.pop(), 'a generic class');
assert.equal(stack.pop(), ___, 'and the stack is empty again');
type Maybe<T = string> = T | null;
assert.typeEqual<Maybe, ___>('a default type argument');
