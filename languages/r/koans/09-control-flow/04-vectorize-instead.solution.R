squares <- numeric(0)
for (i in 1:5) squares[i] <- i^2
test_that("a loop that fills a vector", expect_equal(squares, c(1, 4, 9, 16, 25)))
test_that("the same, vectorized", expect_equal((1:5)^2, squares))
balance <- 100 + cumsum(c(-20, 50, -10))
test_that("a running balance without a loop", expect_equal(balance, c(80, 130, 120)))
test_that("vapply with a declared result type", expect_equal(vapply(c("a", "bb"), nchar, integer(1), USE.NAMES = FALSE), c(1L, 2L)))
