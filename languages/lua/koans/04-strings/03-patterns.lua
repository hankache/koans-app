-- title: Patterns
-- intro: Lua's patterns are a small cousin of regular expressions: `%d` is a digit, `%a` a letter, `+` one or more. `find` gives positions, `match` gives the text, and `gsub` replaces.
assert.are.equal(___, ('hello world'):find('world'), 'find gives where it starts')
assert.are.equal(___, ('order 42'):match('%d+'), 'match gives what matched')
local key, value = ('name=Ada'):match('(%a+)=(%a+)')
assert.are.equal(___, value, 'parentheses capture parts')
assert.are.equal(___, (('a1b2'):gsub('%d', '#')), 'gsub replaces every match')
assert.are.equal(___, select(2, ('a1b2'):gsub('%d', '#')), 'and also says how many')
