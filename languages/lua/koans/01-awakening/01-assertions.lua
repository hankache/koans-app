-- title: Assertions
-- intro: Every koan is a set of assertions, named as in busted. Replace each `___` so they all pass. `assert(v)` wants something true; `assert.are.equal(expected, actual)` compares, with the value you expect first.
assert(___, 'assert passes when given something true')
assert.are.equal(___, 1 + 1, 'are.equal: what you expect, then what the code computes')
assert.are.equal(___, 'Lu' .. 'a', '.. joins strings')
assert.is_true(___, 'is_true wants true itself')
assert.is_nil(___, 'is_nil wants nil')
assert.are.same(___, {1, 2}, 'are.same compares tables by their contents')
