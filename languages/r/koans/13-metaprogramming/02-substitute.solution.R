label <- function(x) deparse(substitute(x))
test_that("substitute gives the code of an argument", expect_equal(label(a + b), "a + b"))
test_that("not its value", expect_equal(label(1:3), "1:3"))
show_value <- function(x) paste(deparse(substitute(x)), "=", x)
total <- 42
test_that("the code and the value", expect_equal(show_value(total), "total = 42"))
test_that("substitute can fill in values", expect_equal(deparse(substitute(a + b, list(a = 1))), "1 + b"))
lazy <- function(x) "never looked"
test_that("an argument never used never runs", expect_equal(lazy(stop("boom")), "never looked"))
