# title: substitute
# intro: Inside a function, `substitute(arg)` gives the code that was passed, not its value. That's how functions like `plot` know what to call their axes.
label <- function(x) deparse(substitute(x))
test_that("substitute gives the code of an argument", expect_equal(label(a + b), ___))
test_that("not its value", expect_equal(label(1:3), ___))
show_value <- function(x) paste(deparse(substitute(x)), "=", x)
total <- 42
test_that("the code and the value", expect_equal(show_value(total), ___))
test_that("substitute can fill in values", expect_equal(deparse(substitute(a + b, list(a = 1))), ___))
lazy <- function(x) "never looked"
test_that("an argument never used never runs", expect_equal(lazy(stop("boom")), ___))
