assert.are.equal('Smith, John', (('John Smith'):gsub('(%a+) (%a+)', '%2, %1')), '%1 and %2 are captures')
assert.are.equal('2 4 6', (('1 2 3'):gsub('%d', function(d) return d * 2 end)), 'a function computes each replacement')
local vars = {name = 'Ada', lang = 'Lua'}
assert.are.equal('Ada likes Lua', (('$name likes $lang'):gsub('%$(%a+)', vars)), 'a table looks each one up')
assert.are.equal('Hello World', (('hello world'):gsub('(%a)(%a*)', function(first, rest) return first:upper() .. rest end)), 'capitalize each word')
