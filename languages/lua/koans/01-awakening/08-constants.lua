-- title: Constants
-- intro: `local name <const> = value` makes a local that can't be assigned again: trying is an error before the code even runs. The table it holds can still change.
local LIMIT <const> = 10
assert.are.equal(___, LIMIT * 2, 'a const is used like any other variable')
local chunk, err_text = load('local x <const> = 1; x = 2')
assert.are.equal(___, chunk, 'assigning to it does not even compile')
assert.matches(___, err_text, 'and the error says why')
local settings <const> = {}
settings.theme = 'dark'
assert.are.equal(___, settings.theme, 'the variable is constant, not the table')
