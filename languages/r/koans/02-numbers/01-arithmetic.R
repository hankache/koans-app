# title: Arithmetic
# intro: `/` always gives a double. `%/%` is integer division, rounding down; `%%` is the remainder, with the sign of the divisor; `^` raises to a power.
test_that("/ divides exactly", expect_equal(7 / 2, ___))
test_that("%/% rounds down", expect_equal(-7 %/% 2, ___))
test_that("%% takes the divisor's sign", expect_equal(-7 %% 3, ___))
test_that("^ is a power", expect_equal(2^10, ___))
test_that("sqrt and exp", {
  expect_equal(sqrt(81), ___)
  expect_equal(log(exp(2)), ___)
})
