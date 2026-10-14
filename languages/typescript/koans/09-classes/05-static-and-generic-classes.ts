// title: Static and generic classes
// intro: Static members belong to the class, and their type to `typeof TheClass`. A generic class keeps track of the type it was made with.
class Registry<T> {
  static count = 0;
  #items = new Map<string, T>();
  add(key: string, item: T) {
    Registry.count++;
    this.#items.set(key, item);
  }
  get(key: string) {
    return this.#items.get(key);
  }
}
const dates = new Registry<Date>();
dates.add('epoch', new Date(0));
expectTypeOf(dates.get('epoch')).toEqualTypeOf<___>(); // T is Date
expect(Registry.count, 'a static field').toBe(___);
expectTypeOf(Registry.count).toEqualTypeOf<___>(); // typed on the class itself
