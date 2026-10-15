total <- 0
for (x in c(2, 4, 6)) total <- total + x
test_that("for walks a vector", expect_equal(total, 12))
n <- 1
while (n < 100) n <- n * 3
test_that("while", expect_equal(n, 243))
odds <- c()
for (i in 1:6) {
  if (i %% 2 == 0) next
  odds <- c(odds, i)
}
test_that("next skips", expect_equal(odds, c(1L, 3L, 5L)))
runs <- 0
for (i in seq_along(c())) runs <- runs + 1
test_that("seq_along of nothing runs no rounds", expect_equal(runs, 0))
