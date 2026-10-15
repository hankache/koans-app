# title: Summaries
# intro: Vectors have summary functions: `sum`, `mean`, `median`, `range`, and running versions like `cumsum`.
x <- c(4, 8, 15, 16, 23, 42)
test_that("sum and mean", {
  expect_equal(sum(x), ___)
  expect_equal(mean(x), ___)
})
test_that("median", expect_equal(median(x), ___))
test_that("range gives both ends", expect_equal(range(x), ___))
test_that("cumsum keeps a running total", expect_equal(cumsum(1:4), ___))
test_that("diff gives the steps", expect_equal(diff(c(1, 4, 9, 16)), ___))
test_that("which.max gives where", expect_equal(which.max(x), ___))
