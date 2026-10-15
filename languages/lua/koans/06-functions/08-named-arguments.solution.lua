local function window(options)
  local width = options.width or 640
  local title = options.title or 'untitled'
  return title .. ' ' .. width
end
assert.are.equal('Koans 800', window{title = 'Koans', width = 800}, 'f{...} passes one table')
assert.are.equal('untitled 640', window{}, 'defaults fill the rest')
local function shout(s) return s:upper() end
assert.are.equal('HI', shout 'hi', 'a single string needs no parentheses either')
