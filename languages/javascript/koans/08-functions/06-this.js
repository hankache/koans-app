// title: this
// intro: In a method, `this` is the object it was called on, which depends on how it's called, not where it was written. `call` and `bind` choose it; arrow functions don't have their own.
const ada = {
  name: 'Ada',
  greet() {
    return `Hi, ${this.name}`;
  },
};
expect(ada.greet(), 'this is the object before the dot').toBe(___);
const loose = ada.greet;
expect(() => loose(), 'called alone, in strict code this is undefined').toThrow(___);
expect(loose.call({ name: 'Alan' }), 'call chooses this').toBe(___);
const bound = loose.bind({ name: 'Grace' });
expect(bound(), 'bind fixes it for good').toBe(___);
const team = {
  name: 'koans',
  members: ['a', 'b'],
  list() {
    return this.members.map(m => `${m}@${this.name}`);
  },
};
expect(team.list(), 'an arrow function uses the this around it').toEqual(___);
