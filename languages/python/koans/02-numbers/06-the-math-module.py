# title: The math module
# intro: The `math` module has the functions and constants a calculator would: square roots, rounding up and down, factorials, `pi` and `inf`.
import math

assert math.sqrt(16) == ___, 'square roots are floats'
assert math.floor(-1.5) == ___, 'floor rounds down'
assert math.ceil(1.2) == ___, 'ceil rounds up'
assert math.factorial(5) == ___, '5 × 4 × 3 × 2 × 1'
assert math.gcd(12, 18) == ___, 'the greatest common divisor'
assert math.isclose(0.1 + 0.2, ___), 'isclose compares floats with a tolerance'
assert round(math.pi, 4) == ___, 'pi, rounded'
