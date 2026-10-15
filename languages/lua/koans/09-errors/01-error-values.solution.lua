local ok, err = pcall(function()
  error({code = 404, reason = 'not found'})
end)
assert.is_false(ok, 'the call failed')
assert.are.equal(404, err.code, 'and the error is the table itself')
local function check_age(age)
  if type(age) ~= 'number' then error({code = 'type', got = type(age)}) end
  return age
end
local _, e = pcall(check_age, 'ten')
assert.are.same({code = 'type', got = 'string'}, e, 'details for the caller')
assert.has_no.errors(function() check_age(30) end, 'has_no.errors wants none')
