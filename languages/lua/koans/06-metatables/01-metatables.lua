-- title: Metatables
-- intro: A metatable changes how a table behaves. Its `__index` is where Lua looks for a key the table doesn't have: another table, or a function.
local defaults = {color = 'red', size = 1}
local settings = setmetatable({size = 3}, {__index = defaults})
assert.are.equal(___, settings.size, 'the table answers first')
assert.are.equal(___, settings.color, 'then __index')
assert.are.equal(___, rawget(settings, 'color'), 'rawget skips the metatable')
local counts = setmetatable({}, {__index = function() return 0 end})
assert.are.equal(___, counts.anything, 'an __index function answers every missing key')
