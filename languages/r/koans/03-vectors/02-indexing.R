# title: Indexing
# intro: Indexes start at 1. A negative index leaves elements out, a logical vector picks the `TRUE` ones, and names pick by name.
x <- c(10, 20, 30, 40)
test_that("the first element is 1", expect_equal(x[1], ___))
test_that("several at once", expect_equal(x[c(1, 3)], ___))
test_that("negative leaves out", expect_equal(x[-1], ___))
test_that("a logical index", expect_equal(x[x > 15], ___))
test_that("past the end is NA", expect_equal(x[10], ___))
ages <- c(ada = 36, alan = 41)
test_that("by name", expect_equal(ages[["alan"]], ___))
