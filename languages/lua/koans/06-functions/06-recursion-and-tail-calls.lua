-- title: Recursion and tail calls
-- intro: A function can call itself; a local one must be declared before it's defined. A call in `return f(x)` position is a proper tail call: it doesn't grow the stack.
local function factorial(n)
  if n <= 1 then return 1 end
  return n * factorial(n - 1)
end
assert.are.equal(___, factorial(5), 'local function can call itself')
local function count_down(n)
  if n == 0 then return 'done' end
  return count_down(n - 1)
end
assert.are.equal(___, count_down(100000), 'a tail call can go deep')
local is_even, is_odd
function is_even(n) if n == 0 then return true end return is_odd(n - 1) end
function is_odd(n) if n == 0 then return false end return is_even(n - 1) end
assert.is_true(___, 'functions that call each other')
