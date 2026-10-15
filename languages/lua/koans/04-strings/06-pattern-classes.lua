-- title: Pattern classes
-- intro: Lua patterns aren't regular expressions, but they're close: `%d` digits, `%a` letters, `%s` spaces, `%w` both, `.` anything, with `+`, `*`, `-` (shortest) and `?`, and `^` and `$` to anchor.
assert.are.equal(___, ('in 2026'):match('%d+'), '%d+ is one or more digits')
assert.are.equal(___, ('<b>bold</b>'):match('<.->'), '- is the shortest match')
assert.are.equal(___, ('<b>bold</b>'):match('<.*>'), '* is the longest')
assert.are.equal(___, ('abc123'):match('^%d+'), '^ anchors to the start')
assert.are.equal(___, ('  trim  '):match('^%s*(.-)%s*$'), 'trimming with a capture')
assert.matches(___, 'koan.lua', 'assert.matches; %. is a literal dot')
