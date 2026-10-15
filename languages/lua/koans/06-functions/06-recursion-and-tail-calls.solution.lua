local function factorial(n)
  if n <= 1 then return 1 end
  return n * factorial(n - 1)
end
assert.are.equal(120, factorial(5), 'local function can call itself')
local function count_down(n)
  if n == 0 then return 'done' end
  return count_down(n - 1)
end
assert.are.equal('done', count_down(100000), 'a tail call can go deep')
local is_even, is_odd
function is_even(n) if n == 0 then return true end return is_odd(n - 1) end
function is_odd(n) if n == 0 then return false end return is_even(n - 1) end
assert.is_true(is_even(10), 'functions that call each other')
