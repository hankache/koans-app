ignore <- function(x) "fine"
test_that("an unused argument never runs", expect_equal(ignore(stop("never")), "fine"))
show_expr <- function(x) deparse(substitute(x))
test_that("substitute sees the expression, not its value", expect_equal(show_expr(a + b), "a + b"))
f <- function(x, y = x * 2) {
  x <- 10
  y
}
test_that("a default is evaluated when first used", expect_equal(f(1), 20))
