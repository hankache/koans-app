local function map(t, f)
  local out = {}
  for i, v in ipairs(t) do
    out[i] = f(v)
  end
  return out
end
assert.are.same({2, 4, 6}, map({1, 2, 3}, function(n) return n * 2 end), 'pass a function in')
local ops = {
  add = function(a, b) return a + b end,
  mul = function(a, b) return a * b end,
}
assert.are.equal(12, ops.mul(3, 4), 'keep functions in a table')
local function twice(f)
  return function(x) return f(f(x)) end
end
assert.are.equal(8, twice(function(x) return x * 2 end)(2), 'return a function')
