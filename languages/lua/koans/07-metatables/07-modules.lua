-- title: Modules
-- intro: A Lua module is just a table of functions, usually built as `local M = {}` and returned at the end. Private helpers are locals the table doesn't include.
local function make_stack_module()
  local M = {}
  local function check(s) if #s == 0 then error('empty stack', 3) end end
  function M.new() return {} end
  function M.push(s, v) s[#s + 1] = v end
  function M.pop(s)
    check(s)
    return table.remove(s)
  end
  return M
end
local stack = make_stack_module()
local s = stack.new()
stack.push(s, 'a')
stack.push(s, 'b')
assert.are.equal(___, stack.pop(s), 'last in, first out')
assert.is_nil(___, 'check is private to the module')
stack.pop(s)
assert.error_matches(function() stack.pop(s) end, ___, 'and guards the module')
