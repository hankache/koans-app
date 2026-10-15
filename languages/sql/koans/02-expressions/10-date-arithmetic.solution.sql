-- several modifiers, applied in order
SELECT date('2026-01-31', '+1 month', 'start of month');
-- expect: '2026-03-01'

-- the last day of a month
SELECT date('2026-02-10', 'start of month', '+1 month', '-1 day');
-- expect: '2026-02-28'

-- seconds since 1970
SELECT unixepoch('1970-01-02');
-- expect: 86400

-- 15 October 2026 is a Thursday
SELECT strftime('%w', '2026-10-15');
-- expect: '4'

-- whole days between two dates
SELECT CAST(julianday('2027-01-01') - julianday('2026-10-15') AS INTEGER);
-- expect: 78
