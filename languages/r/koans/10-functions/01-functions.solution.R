area <- function(width, height) width * height
test_that("call it", expect_equal(area(3, 4), 12))
test_that("arguments by name, in any order", expect_equal(area(height = 2, width = 5), 10))
sign_of <- function(x) {
  if (x == 0) return("zero")
  if (x > 0) "positive" else "negative"
}
test_that("return leaves early", expect_equal(sign_of(0), "zero"))
test_that("\\(x) is short for function(x)", expect_equal((\(x) x + 1)(1), 2))
test_that("functions are vectorized when their body is", expect_equal(area(1:3, 2), c(2, 4, 6)))
