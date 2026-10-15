-- title: gsub with functions and tables
-- intro: `gsub` can replace each match with a string (where `%1` is a capture), the result of a function, or a value looked up in a table.
assert.are.equal(___, (('John Smith'):gsub('(%a+) (%a+)', '%2, %1')), '%1 and %2 are captures')
assert.are.equal(___, (('1 2 3'):gsub('%d', function(d) return d * 2 end)), 'a function computes each replacement')
local vars = {name = 'Ada', lang = 'Lua'}
assert.are.equal(___, (('$name likes $lang'):gsub('%$(%a+)', vars)), 'a table looks each one up')
assert.are.equal(___, (('hello world'):gsub('(%a)(%a*)', function(first, rest) return first:upper() .. rest end)), 'capitalize each word')
