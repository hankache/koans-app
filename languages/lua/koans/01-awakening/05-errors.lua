-- title: Errors
-- intro: `error()` raises an error. `pcall` calls a function and catches one, returning `false` and the message instead of stopping. busted's `has_error` wants a function to raise.
assert.has_error(___, 'has_error wants the function to raise')
assert.error_matches(function() error('out of coffee') end, ___, 'error_matches checks the message')
local ok, message = pcall(error, 'oops', 0)
assert.are.equal(___, ok, 'pcall returns false when the call fails')
assert.are.equal(___, message, 'and the error message')
assert.are.equal(___, (pcall(math.floor, 1.5)), 'and true when it works')
