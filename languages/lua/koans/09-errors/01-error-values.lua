-- title: Error values
-- intro: `error` can raise any value, not just a string. A table carries structured details, which `pcall` hands back untouched.
local ok, err = pcall(function()
  error({code = 404, reason = 'not found'})
end)
assert.is_false(___, 'the call failed')
assert.are.equal(___, err.code, 'and the error is the table itself')
local function check_age(age)
  if type(age) ~= 'number' then error({code = 'type', got = type(age)}) end
  return age
end
local _, e = pcall(check_age, 'ten')
assert.are.same(___, e, 'details for the caller')
assert.has_no.errors(___, 'has_no.errors wants none')
