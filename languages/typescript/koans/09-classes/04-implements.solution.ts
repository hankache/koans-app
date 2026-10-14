interface Comparable<T> {
  compareTo(other: T): number;
}
class Money implements Comparable<Money> {
  constructor(readonly cents: number) {}
  compareTo(other: Money) {
    return this.cents - other.cents;
  }
}
const prices = [new Money(500), new Money(150), new Money(300)];
expect(prices.sort((a, b) => a.compareTo(b)).map(m => m.cents), 'sorted with compareTo').toEqual([150, 300, 500]);
expectTypeOf<Money>().toExtend<Comparable<Money>>(); // a Money is a Comparable<Money>
