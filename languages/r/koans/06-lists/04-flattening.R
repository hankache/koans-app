# title: Flattening
# intro: `unlist` flattens a list into a vector, converting types if needed. `do.call` calls a function with a list as its arguments.
test_that("unlist flattens", expect_equal(unlist(list(1, list(2, 3))), ___))
test_that("names are kept, and joined", expect_equal(unlist(list(a = 1, b = list(c = 2))), ___))
test_that("mixed types become text", expect_equal(unlist(list(1, "a")), ___))
test_that("do.call with a list of arguments", expect_equal(do.call(paste, list("a", "b", sep = "+")), ___))
test_that("do.call rbind stacks rows", expect_equal(nrow(do.call(rbind, list(1:2, 3:4, 5:6))), ___))
