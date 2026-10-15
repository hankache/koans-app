# title: Changing vectors
# intro: Assigning to an index changes that element, even past the end, which fills the gap with `NA`. Vectors are copied when changed, so other names are left alone.
x <- c(1, 2, 3)
x[2] <- 20
test_that("assign to an index", expect_equal(x, ___))
x[5] <- 5
test_that("past the end fills with NA", expect_equal(x, ___))
y <- x
y[1] <- 100
test_that("y is a copy", expect_equal(x[1], ___))
x[x > 4 & !is.na(x)] <- 0
test_that("assign through a logical index", expect_equal(x, ___))
test_that("append adds", expect_equal(append(1:3, 99, after = 1), ___))
