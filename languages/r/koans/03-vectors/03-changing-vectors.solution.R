x <- c(1, 2, 3)
x[2] <- 20
test_that("assign to an index", expect_equal(x, c(1, 20, 3)))
x[5] <- 5
test_that("past the end fills with NA", expect_equal(x, c(1, 20, 3, NA, 5)))
y <- x
y[1] <- 100
test_that("y is a copy", expect_equal(x[1], 1))
x[x > 4 & !is.na(x)] <- 0
test_that("assign through a logical index", expect_equal(x, c(1, 0, 3, NA, 0)))
test_that("append adds", expect_equal(append(1:3, 99, after = 1), c(1, 99, 2, 3)))
