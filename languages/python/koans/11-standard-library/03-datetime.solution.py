from datetime import date, datetime, timedelta

d = date(2026, 10, 15)
assert d + timedelta(days=20) == date(2026, 11, 4), 'add a duration'
assert (date(2026, 12, 25) - d).days == 71, 'subtract dates to get a duration'
assert d.strftime('%Y/%m/%d') == '2026/10/15', 'format a date'
assert date.fromisoformat('2024-02-29').day == 29, 'parse an ISO date'
assert d.isoweekday() == 4, 'Monday is 1, so Thursday is 4'
assert datetime(2026, 1, 1, 9, 30).strftime('%H:%M') == '09:30', 'times too'
