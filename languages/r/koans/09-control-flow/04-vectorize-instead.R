# title: Vectorize instead
# intro: Many loops in R are better written without one: building a vector element by element is slow, and `vapply`, `cumsum` or plain arithmetic say the same thing directly.
squares <- numeric(0)
for (i in 1:5) squares[i] <- i^2
test_that("a loop that fills a vector", expect_equal(squares, ___))
test_that("the same, vectorized", expect_equal((1:5)^2, ___))
balance <- 100 + cumsum(c(-20, 50, -10))
test_that("a running balance without a loop", expect_equal(balance, ___))
test_that("vapply with a declared result type", expect_equal(vapply(c("a", "bb"), nchar, integer(1), USE.NAMES = FALSE), ___))
