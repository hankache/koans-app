-- Run before every koan. The build drops these comment lines and joins the rest onto ONE line,
-- so error line numbers shift by exactly one; Lua doesn't need newlines between statements.
-- Never put a -- comment at the end of a code line: the join would comment out the rest.
--
-- The assertions are busted's (assert.are.equal(expected, actual)), and like Raku's Test module
-- they print TAP: a failing assertion reports itself and the koan carries on, so every blank can
-- be checked. Each failure also reports the learner's line as "# at web line N".

-- ___: a unique value. Any assertion given it fails, whatever the assertion.
___ = setmetatable({}, { __tostring = function() return "___" end })

local tests = 0

-- A value written the way you'd write it in Lua: "text", {1, 2, 3}, {a = 1}.
local function show(v, seen)
  if rawequal(v, ___) then return "___" end
  if type(v) == "string" then return '"' .. v:gsub("\\", "\\\\"):gsub('"', '\\"'):gsub("\n", "\\n") .. '"' end
  if type(v) ~= "table" then return tostring(v) end
  seen = seen or {}
  if seen[v] then return "{...}" end
  seen[v] = true
  local parts, n = {}, #v
  for i = 1, n do parts[#parts + 1] = show(v[i], seen) end
  local keys = {}
  for k in pairs(v) do
    if not (math.type(k) == "integer" and k >= 1 and k <= n) then keys[#keys + 1] = k end
  end
  table.sort(keys, function(a, b) return tostring(a) < tostring(b) end)
  for _, k in ipairs(keys) do
    local name = type(k) == "string" and k:match("^[%a_][%w_]*$") and k or ("[" .. show(k, seen) .. "]")
    parts[#parts + 1] = name .. " = " .. show(v[k], seen)
  end
  seen[v] = nil
  return "{" .. table.concat(parts, ", ") .. "}"
end

-- busted's deep equality: tables with the same keys and (deeply) the same values.
local function same(a, b)
  if a == b then return true end
  if type(a) ~= "table" or type(b) ~= "table" then return false end
  for k, v in pairs(a) do if not same(v, b[k]) then return false end end
  for k in pairs(b) do if a[k] == nil then return false end end
  return true
end

-- The koan's line that made this call: the first frame in koan.lua below the prelude (line 1).
local function learner_line()
  for level = 2, 60 do
    local info = debug.getinfo(level, "Sl")
    if not info then break end
    if info.source == "=koan.lua" and info.currentline > 1 then return info.currentline end
  end
  return 0
end

local function report(ok, msg, diag)
  -- A message that isn't a string is usually a call's extra results: f() passes all of them on.
  if msg ~= nil and type(msg) ~= "string" then
    ok, diag, msg = false, { "the message is " .. show(msg) .. ", not a string: did a call return more than one value? Wrap it in parentheses" }, nil
  end
  tests = tests + 1
  io.stdout:write((ok and "ok " or "not ok ") .. tests .. (msg and (" - " .. msg) or "") .. "\n")
  if not ok then
    for _, d in ipairs(diag or {}) do io.stderr:write("# " .. d .. "\n") end
    io.stderr:write("# at web line " .. learner_line() .. "\n")
  end
  return ok
end

local function compare(ok, expected, actual, msg)
  return report(ok, msg, { "expected: " .. show(expected), "     got: " .. show(actual) })
end

local function blank(...)
  for i = 1, select("#", ...) do
    if rawequal(select(i, ...), ___) then return true end
  end
  return false
end

local checks = {}

-- Passes when expected == actual.
function checks.equal(expected, actual, msg)
  if blank(expected, actual) then return report(false, msg) end
  return compare(expected == actual, expected, actual, msg)
end

-- Passes when they differ.
function checks.not_equal(unexpected, actual, msg)
  if blank(unexpected, actual) then return report(false, msg) end
  return report(unexpected ~= actual, msg, { "didn't want: " .. show(unexpected) })
end

-- Passes when the tables have the same contents, all the way down.
function checks.same(expected, actual, msg)
  if blank(expected, actual) then return report(false, msg) end
  return compare(same(expected, actual), expected, actual, msg)
end

-- Passes when the value is true, exactly; false, exactly; or nil.
function checks.is_true(v, msg)
  if blank(v) then return report(false, msg) end
  return compare(v == true, true, v, msg)
end
function checks.is_false(v, msg)
  if blank(v) then return report(false, msg) end
  return compare(v == false, false, v, msg)
end
function checks.is_nil(v, msg)
  if blank(v) then return report(false, msg) end
  return compare(v == nil, nil, v, msg)
end

-- Passes when the value counts as true (anything but false and nil), or as false.
function checks.truthy(v, msg)
  if blank(v) then return report(false, msg) end
  return report(v and true or false, msg)
end
function checks.falsy(v, msg)
  if blank(v) then return report(false, msg) end
  return report(not v, msg)
end

-- Passes when calling fn raises an error.
function checks.has_error(fn, msg)
  if blank(fn) then return report(false, msg) end
  local ok = pcall(fn)
  return report(not ok, msg, { "expected: an error", "     got: no error" })
end

-- Passes when calling fn raises an error whose message matches the Lua pattern.
function checks.error_matches(fn, pattern, msg)
  if blank(fn, pattern) then return report(false, msg) end
  local ok, err = pcall(fn)
  if ok then return report(false, msg, { "expected: an error matching " .. show(pattern), "     got: no error" }) end
  local text = tostring(err):gsub("^[^:]*:%d+: ", "")
  return compare(text:find(pattern) ~= nil, pattern, text, msg)
end

-- assert is a table of checks, and also callable, like busted's: assert(v, msg) wants a true value.
assert = setmetatable({ are = { equal = checks.equal, same = checks.same }, are_not = { equal = checks.not_equal } }, {
  __call = function(_, v, msg) return checks.truthy(v, msg) end,
})
for name, check in pairs(checks) do assert[name] = check end
