test_that("halves go to the even neighbor", expect_equal(round(2.5), 2))
test_that("and so 3.5 goes up", expect_equal(round(3.5), 4))
test_that("round to places", expect_equal(round(3.14159, 2), 3.14))
test_that("signif keeps significant digits", expect_equal(signif(123456, 2), 120000))
test_that("floor and ceiling", {
  expect_equal(floor(-1.5), -2)
  expect_equal(ceiling(1.2), 2)
})
test_that("trunc drops the fraction", expect_equal(trunc(-1.7), -1))
