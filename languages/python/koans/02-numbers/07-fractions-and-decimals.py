# title: Fractions and decimals
# intro: `Fraction` keeps exact fractions, and `Decimal` does decimal arithmetic the way you would by hand, so `0.1 + 0.2` is exactly `0.3`.
from fractions import Fraction
from decimal import Decimal

assert Fraction(1, 3) + Fraction(1, 6) == ___, 'fractions add exactly'
assert Fraction(6, 8) == ___, 'and stay in lowest terms'
assert Fraction(1, 2).denominator == ___, 'they have a numerator and a denominator'
assert Decimal('0.1') + Decimal('0.2') == ___, 'decimals are exact in base ten'
assert str(Decimal('1.10') + Decimal('2.20')) == ___, 'and keep their places'
