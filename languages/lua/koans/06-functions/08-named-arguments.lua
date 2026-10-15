-- title: Named arguments
-- intro: Lua has no keyword arguments, but a call with a single table can be written without parentheses, `f{…}`, which reads like named arguments with defaults.
local function window(options)
  local width = options.width or 640
  local title = options.title or 'untitled'
  return title .. ' ' .. width
end
assert.are.equal(___, window{title = 'Koans', width = 800}, 'f{...} passes one table')
assert.are.equal(___, window{}, 'defaults fill the rest')
local function shout(s) return s:upper() end
assert.are.equal(___, shout 'hi', 'a single string needs no parentheses either')
