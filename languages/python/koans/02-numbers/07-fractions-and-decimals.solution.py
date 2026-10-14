from fractions import Fraction
from decimal import Decimal

assert Fraction(1, 3) + Fraction(1, 6) == Fraction(1, 2), 'fractions add exactly'
assert Fraction(6, 8) == Fraction(3, 4), 'and stay in lowest terms'
assert Fraction(1, 2).denominator == 2, 'they have a numerator and a denominator'
assert Decimal('0.1') + Decimal('0.2') == Decimal('0.3'), 'decimals are exact in base ten'
assert str(Decimal('1.10') + Decimal('2.20')) == '3.30', 'and keep their places'
