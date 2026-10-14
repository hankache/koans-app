-- title: Types
-- intro: `type()` names a value's type: Lua has only eight. Numbers are integers or floats, and `math.type()` tells which.
assert.are.equal(___, type(42), 'numbers')
assert.are.equal(___, type('hi'), 'strings')
assert.are.equal(___, type(nil), 'nil has a type of its own')
assert.are.equal(___, type({}), 'tables are the only data structure')
assert.are.equal(___, type(print), 'functions are values')
assert.are.equal(___, math.type(1), 'an integer')
assert.are.equal(___, math.type(1.0), 'and a float')
