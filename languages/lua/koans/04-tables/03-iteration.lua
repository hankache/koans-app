-- title: Iteration
-- intro: `ipairs` walks an array in order, stopping at the first `nil`; `pairs` visits every key, in no particular order.
local total = 0
for _, n in ipairs({1, 2, 3}) do
  total = total + n
end
assert.are.equal(___, total, 'ipairs walks the array')
local seen = 0
for _ in ipairs({1, 2, nil, 4}) do
  seen = seen + 1
end
assert.are.equal(___, seen, 'and stops at the first nil')
local keys = 0
for _ in pairs({a = 1, b = 2, c = 3}) do
  keys = keys + 1
end
assert.are.equal(___, keys, 'pairs visits every key')
