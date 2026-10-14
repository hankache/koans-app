// title: Access modifiers
// intro: `private` and `protected` are checked by the compiler only; at run time the field is an ordinary property. A `#` field is private at run time too.
class Account {
  private balance = 100;
  #pin = '1234';
  check(pin: string) {
    return pin === this.#pin ? this.balance : 0;
  }
}
const acct = new Account();
expect(acct.check('1234'), 'the class can use both').toBe(___);
expect((acct as unknown as { balance: number }).balance, 'private is only a compile-time check').toBe(___);
expect(Object.keys(acct), 'a # field is not a property at all').toEqual(___);
