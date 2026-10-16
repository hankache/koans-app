-- title: Run-length encoding
-- intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. Lua patterns can't repeat a capture, so the encoder walks the string; `gsub` with a function decodes it.
local function encode(s)
  local out, i = {}, 1
  while i <= #s do
    local ch, j = s:sub(i, i), i
    while s:sub(j + 1, j + 1) == ch do j = j + 1 end
    out[#out + 1] = (j - i + 1) .. ch
    i = j + 1
  end
  return table.concat(out)
end
local function decode(s)
  return (s:gsub('(%d+)(%D)', function(n, ch) return ch:rep(tonumber(n)) end))
end
assert.are.equal(___, encode('aaabcc'), 'each run becomes a count and a letter')
assert.are.equal(___, encode(''), 'nothing stays nothing')
assert.are.equal(___, decode('2x3y'), 'decoding repeats each letter')
assert.are.equal(___, decode(encode('hello')), 'the round trip')
