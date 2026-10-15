-- title: Dates and times
-- intro: `os.time` turns a date table into seconds since 1970, and `os.date` formats seconds; a format starting with `!` uses UTC, so results don't depend on where the code runs.
local t = os.time({year = 2026, month = 1, day = 1, hour = 12})
local later = os.time({year = 2026, month = 1, day = 2, hour = 12})
assert.are.equal(___, later - t, 'a day in seconds')
assert.are.equal(___, os.date('!%Y-%m-%d', 0), 'second 0 in UTC')
assert.are.equal(___, os.date('!%A', 0), 'the epoch was a Thursday')
local d = os.date('!*t', 86400 * 31)
assert.are.equal(___, d.month, '*t gives a table; day 32 of 1970 is in February')
assert.is_number(___, 'os.clock measures processor time')
