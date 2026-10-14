# title: datetime
# intro: `datetime` handles dates and times: `date` and `datetime` values, `timedelta` for differences, and `strftime` for formatting.
from datetime import date, datetime, timedelta

d = date(2026, 10, 15)
assert d + timedelta(days=20) == ___, 'add a duration'
assert (date(2026, 12, 25) - d).days == ___, 'subtract dates to get a duration'
assert d.strftime('%Y/%m/%d') == ___, 'format a date'
assert date.fromisoformat('2024-02-29').day == ___, 'parse an ISO date'
assert d.isoweekday() == ___, 'Monday is 1, so Thursday is 4'
assert datetime(2026, 1, 1, 9, 30).strftime('%H:%M') == ___, 'times too'
