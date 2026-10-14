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
expectTypeOf(dates.get('epoch')).toEqualTypeOf<Date | undefined>(); // T is Date
expect(Registry.count, 'a static field').toBe(1);
expectTypeOf(Registry.count).toEqualTypeOf<number>(); // typed on the class itself
