# title: Floats and rationals
# intro: Floats are binary approximations. Integers grow without limit, and rationals, written with an `r`, are exact fractions.
assert_equal ___, 0.1 + 0.2 == 0.3, 'floats are approximations'
assert_equal ___, (0.1 + 0.2).round(2), 'round them before comparing'
assert_equal ___, (2**100).class, 'integers grow as large as needed'
assert_equal ___, (1/3r).class, '1/3r is a rational'
assert_equal ___, 1/3r + 1/6r, 'and rationals add exactly'
assert_equal ___, (1/2r).to_f, 'to_f turns one into a float'
