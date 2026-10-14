local defaults = {color = 'red', size = 1}
local settings = setmetatable({size = 3}, {__index = defaults})
assert.are.equal(3, settings.size, 'the table answers first')
assert.are.equal('red', settings.color, 'then __index')
assert.are.equal(nil, rawget(settings, 'color'), 'rawget skips the metatable')
local counts = setmetatable({}, {__index = function() return 0 end})
assert.are.equal(0, counts.anything, 'an __index function answers every missing key')
