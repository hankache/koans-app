const ada = {
  name: 'Ada',
  greet() {
    return `Hi, ${this.name}`;
  },
};
expect(ada.greet(), 'this is the object before the dot').toBe('Hi, Ada');
const loose = ada.greet;
expect(() => loose(), 'called alone, in strict code this is undefined').toThrow(TypeError);
expect(loose.call({ name: 'Alan' }), 'call chooses this').toBe('Hi, Alan');
const bound = loose.bind({ name: 'Grace' });
expect(bound(), 'bind fixes it for good').toBe('Hi, Grace');
const team = {
  name: 'koans',
  members: ['a', 'b'],
  list() {
    return this.members.map(m => `${m}@${this.name}`);
  },
};
expect(team.list(), 'an arrow function uses the this around it').toEqual(['a@koans', 'b@koans']);
