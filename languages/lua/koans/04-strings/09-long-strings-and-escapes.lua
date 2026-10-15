-- title: Long strings and escapes
-- intro: `[[ … ]]` writes a string across lines without escapes; add `=` signs, `[==[ … ]==]`, when the text contains `]]`. In quoted strings, escapes include `\n`, `\t` and `\u{…}`.
local poem = [[
first
second]]
assert.are.equal(___, poem, 'a newline right after [[ is skipped')
assert.are.equal(___, [==[a]]b]==], 'equals signs allow ]] inside')
assert.are.equal(___, '\u{E9}', '\\u{} writes a character by its code point')
assert.are.equal(___, '\65', 'a decimal byte value')
