test_that("/ divides exactly", expect_equal(7 / 2, 3.5))
test_that("%/% rounds down", expect_equal(-7 %/% 2, -4))
test_that("%% takes the divisor's sign", expect_equal(-7 %% 3, 2))
test_that("^ is a power", expect_equal(2^10, 1024))
test_that("sqrt and exp", {
  expect_equal(sqrt(81), 9)
  expect_equal(log(exp(2)), 2)
})
