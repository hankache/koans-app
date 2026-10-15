# title: Everything is a vector
# intro: R has no single values: `5` is a vector of length one. `c()` combines values into a longer vector, and most operations work on every element at once.
test_that("a number is a vector of length 1", expect_length(5, ___))
test_that("c() combines", expect_equal(c(1, 2, 3), ___))
test_that("c() flattens vectors into one", expect_equal(length(c(c(1, 2), c(3, 4, 5))), ___))
test_that("arithmetic works element by element", expect_equal(c(1, 2, 3) * 10, ___))
test_that("1:5 is a sequence", expect_equal(sum(1:5), ___))
