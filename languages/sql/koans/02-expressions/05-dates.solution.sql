-- add a day
SELECT date('2026-10-14', '+1 day');
-- expect: '2026-10-15'

-- 2024 is a leap year
SELECT date('2024-03-01', '-1 day');
-- expect: '2024-02-29'

-- strftime takes parts out
SELECT strftime('%Y', '2026-10-14');
-- expect: '2026'

-- days between two dates
SELECT julianday('2026-12-25') - julianday('2026-12-01');
-- expect: 24.0

-- the start of the month
SELECT date('2026-10-14', 'start of month');
-- expect: '2026-10-01'
