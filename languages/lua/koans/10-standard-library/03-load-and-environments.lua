-- title: load and environments
-- intro: `load` compiles a string into a function. Its environment, the table where its globals live, can be chosen, which keeps the loaded code away from yours.
local add = load('return 2 + 3')
assert.are.equal(___, add(), 'load returns a function')
local f, err = load('return +')
assert.is_nil(___, 'a syntax error gives nil')
assert.matches(___, err, 'and a message')
local sandbox = {x = 10}
local chunk = load('y = x * 2', 'chunk', 't', sandbox)
chunk()
assert.are.equal(___, sandbox.y, 'globals of the chunk live in the sandbox')
assert.is_nil(___, 'not in ours')
local args = load('local a, b = ...; return a .. b')
assert.are.equal(___, args('a', 'b'), 'a chunk receives arguments as ...')
