# title: table
# intro: `table` counts how often each value appears, as a named table, sorted by value. With two vectors it cross-tabulates.
pets <- c("cat", "dog", "cat", "fish", "cat")
counts <- table(pets)
test_that("counts by value", expect_equal(as.vector(counts), ___))
test_that("names are the values", expect_equal(names(counts), ___))
test_that("the most common", expect_equal(names(which.max(counts)), ___))
test_that("a factor's unused levels count zero", expect_equal(as.vector(table(factor("a", levels = c("a", "b")))), ___))
test_that("cross-tabulation", expect_equal(dim(table(c("x", "y", "x"), c(1, 1, 2))), ___))
