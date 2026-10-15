# title: Dots
# intro: `...` collects any extra arguments, to pass on to another function or to look at with `list(...)` and `...length()`.
count_args <- function(...) ...length()
test_that("...length counts", expect_equal(count_args(1, "a", NULL), ___))
my_paste <- function(...) paste(..., sep = "_")
test_that("pass them on", expect_equal(my_paste("a", "b"), ___))
named <- function(...) names(list(...))
test_that("names of the dots", expect_equal(named(x = 1, y = 2), ___))
test_that("sum takes dots too", expect_equal(sum(1, 2, 3:4), ___))
