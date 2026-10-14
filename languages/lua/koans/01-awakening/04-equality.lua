-- title: Equality
-- intro: `==` compares values, without converting strings and numbers into each other. Tables are equal only when they are the same table; `~=` means "not equal".
assert.are.equal(___, 1 == 1.0, 'an integer equals the float with the same value')
assert.are.equal(___, '1' == 1, '== never converts between strings and numbers')
assert.are.equal(___, {} == {}, 'two tables are two different tables')
local t = {}
local u = t
assert.are.equal(___, t == u, 'u is another name for the same table')
assert.are.equal(___, 1 ~= 2, '~= is not equal')
