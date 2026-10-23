# title: Rounding
# intro: `round` rounds a half to the even neighbor, as the IEC 60559 standard says, so `round(2.5)` is 2. `floor`, `ceiling`, `trunc` and `signif` round in other ways.
test_that("halves go to the even neighbor", expect_equal(round(2.5), ___))
test_that("and so 3.5 goes up", expect_equal(round(3.5), ___))
test_that("round to places", expect_equal(round(3.14159, 2), ___))
test_that("signif keeps significant digits", expect_equal(signif(123456, 2), ___))
test_that("floor and ceiling", {
  expect_equal(floor(-1.5), ___)
  expect_equal(ceiling(1.2), ___)
})
test_that("trunc drops the fraction", expect_equal(trunc(-1.7), ___))
