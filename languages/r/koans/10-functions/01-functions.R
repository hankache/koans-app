# title: Functions
# intro: `function(args) body` makes a function; it returns the value of its last expression, or `return()` earlier. Short functions can be written `\\(x)`.
area <- function(width, height) width * height
test_that("call it", expect_equal(area(3, 4), ___))
test_that("arguments by name, in any order", expect_equal(area(height = 2, width = 5), ___))
sign_of <- function(x) {
  if (x == 0) return("zero")
  if (x > 0) "positive" else "negative"
}
test_that("return leaves early", expect_equal(sign_of(0), ___))
test_that("\\(x) is short for function(x)", expect_equal((\(x) x + 1)(1), ___))
test_that("functions are vectorized when their body is", expect_equal(area(1:3, 2), ___))
