# title: Expectations
# intro: Koans are tested the way most R is tested: with testthat. `test_that("what it's about", expect_equal(actual, expected))` wants the two equal, and takes the value you expect second. Several expectations go in braces. Replace each `___` so they all pass.
test_that("expect_equal compares values", expect_equal(1 + 1, ___))
test_that("paste joins strings", expect_equal(paste("R", "koans"), ___))
test_that("a comparison gives TRUE or FALSE", expect_true(___))
test_that("several expectations, one description", {
  expect_equal(2 * 3, ___)
  expect_equal(10 / 4, ___)
})
