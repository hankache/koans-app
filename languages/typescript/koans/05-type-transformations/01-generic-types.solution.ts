interface Box<T> {
  value: T;
}
const box: Box<number> = { value: 1 };
assert.type<number>(box.value, 'Box<number> holds a number');
type Pair<T> = [T, T];
assert.typeEqual<Pair<string>, [string, string]>('a generic type alias');
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
assert.type<string | undefined>(stack.pop(), 'a generic class');
assert.equal(stack.pop(), undefined, 'and the stack is empty again');
type Maybe<T = string> = T | null;
assert.typeEqual<Maybe, string | null>('a default type argument');
