test_that("expect_equal compares values", expect_equal(1 + 1, 2))
test_that("paste joins strings", expect_equal(paste("R", "koans"), "R koans"))
test_that("a comparison gives TRUE or FALSE", expect_true(10 > 3))
test_that("several expectations, one description", {
  expect_equal(2 * 3, 6)
  expect_equal(10 / 4, 2.5)
})
