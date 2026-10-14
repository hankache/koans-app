function* letters() {
  yield 'a';
  yield 'b';
}
function* all() {
  yield* letters();
  yield* [1, 2];
}
expect([...all()], 'yield* yields everything from another').toEqual(['a', 'b', 1, 2]);
function* walk(tree) {
  yield tree.value;
  for (const child of tree.children) yield* walk(child);
}
const tree = { value: 1, children: [{ value: 2, children: [] }, { value: 3, children: [] }] };
expect([...walk(tree)], 'recursion with yield* walks a tree').toEqual([1, 2, 3]);
