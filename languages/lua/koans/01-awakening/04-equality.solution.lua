assert.are.equal(true, 1 == 1.0, 'an integer equals the float with the same value')
assert.are.equal(false, '1' == 1, '== never converts between strings and numbers')
assert.are.equal(false, {} == {}, 'two tables are two different tables')
local t = {}
local u = t
assert.are.equal(true, t == u, 'u is another name for the same table')
assert.are.equal(true, 1 ~= 2, '~= is not equal')
