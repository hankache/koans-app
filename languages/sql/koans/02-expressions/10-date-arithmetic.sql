-- title: Date arithmetic
-- intro: Dates are text in SQLite, worked on by functions with modifiers. `unixepoch` gives seconds since 1970, and `strftime('%w')` the day of the week, 0 for Sunday.
-- several modifiers, applied in order
SELECT date('2026-01-31', '+1 month', 'start of month');
-- expect: ___

-- the last day of a month
SELECT date('2026-02-10', 'start of month', '+1 month', '-1 day');
-- expect: ___

-- seconds since 1970
SELECT unixepoch('1970-01-02');
-- expect: ___

-- 15 October 2026 is a Thursday
SELECT strftime('%w', '2026-10-15');
-- expect: ___

-- whole days between two dates
SELECT CAST(julianday('2027-01-01') - julianday('2026-10-15') AS INTEGER);
-- expect: ___
