-- title: Dates
-- intro: SQLite stores dates as text like `'2026-10-14'` and does date arithmetic with functions: `date` with modifiers such as `'+1 day'`, `strftime` for formatting, and `julianday` for counting days.
-- add a day
SELECT date('2026-10-14', '+1 day');
-- expect: ___

-- 2024 is a leap year
SELECT date('2024-03-01', '-1 day');
-- expect: ___

-- strftime takes parts out
SELECT strftime('%Y', '2026-10-14');
-- expect: ___

-- days between two dates
SELECT julianday('2026-12-25') - julianday('2026-12-01');
-- expect: ___

-- the start of the month
SELECT date('2026-10-14', 'start of month');
-- expect: ___
