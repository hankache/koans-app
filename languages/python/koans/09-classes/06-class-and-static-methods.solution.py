class Date:
    def __init__(self, year, month, day):
        self.year, self.month, self.day = year, month, day

    @classmethod
    def from_string(cls, text):
        return cls(*map(int, text.split('-')))

    @staticmethod
    def is_leap(year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

d = Date.from_string('2026-10-15')
assert d.month == 10, 'a classmethod builds an instance'
assert Date.is_leap(2024) == True, 'a staticmethod is a plain function in a class'
assert Date.is_leap(1900) == False, 'centuries are leap only every 400 years'
