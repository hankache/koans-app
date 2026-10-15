# title: Lazy evaluation
# intro: Arguments are evaluated only when used, so an argument that's never used never runs. `force()` evaluates one on purpose.
ignore <- function(x) "fine"
test_that("an unused argument never runs", expect_equal(ignore(stop("never")), ___))
show_expr <- function(x) deparse(substitute(x))
test_that("substitute sees the expression, not its value", expect_equal(show_expr(a + b), ___))
f <- function(x, y = x * 2) {
  x <- 10
  y
}
test_that("a default is evaluated when first used", expect_equal(f(1), ___))
