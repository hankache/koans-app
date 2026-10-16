# title: Functional tools
# intro: `Map`, `Filter` and `Reduce` apply functions to vectors and lists; `Find` and `Position` look for the first match. `do.call` calls a function with a list of arguments.
test_that("Map applies a function to items side by side", expect_equal(Map(`+`, 1:3, 4:6), ___))
test_that("Filter keeps what passes", expect_equal(Filter(function(x) x %% 2 == 0, 1:6), ___))
test_that("Reduce folds a vector into one value", expect_equal(Reduce(`*`, 1:5), ___))
test_that("accumulate keeps every step", expect_equal(Reduce(`+`, 1:4, accumulate = TRUE), ___))
test_that("Find gives the first match", expect_equal(Find(function(x) x > 2, c(1, 5, 3)), ___))
test_that("Position gives where it is", expect_equal(Position(function(x) x > 2, c(1, 5, 3)), ___))
test_that("do.call passes a list as arguments", expect_equal(dim(do.call(rbind, list(1:2, 3:4, 5:6))), ___))
