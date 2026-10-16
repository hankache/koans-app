local LIMIT <const> = 10
assert.are.equal(20, LIMIT * 2, 'a const is used like any other variable')
local chunk, err_text = load('local x <const> = 1; x = 2')
assert.are.equal(nil, chunk, 'assigning to it does not even compile')
assert.matches('const', err_text, 'and the error says why')
local settings <const> = {}
settings.theme = 'dark'
assert.are.equal('dark', settings.theme, 'the variable is constant, not the table')
