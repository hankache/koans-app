# title: Loops
# intro: `for` walks a vector, `while` repeats while a condition holds, and `repeat` until a `break`. `next` skips to the next round. Use `seq_along` to loop over positions.
total <- 0
for (x in c(2, 4, 6)) total <- total + x
test_that("for walks a vector", expect_equal(total, ___))
n <- 1
while (n < 100) n <- n * 3
test_that("while", expect_equal(n, ___))
odds <- c()
for (i in 1:6) {
  if (i %% 2 == 0) next
  odds <- c(odds, i)
}
test_that("next skips", expect_equal(odds, ___))
runs <- 0
for (i in seq_along(c())) runs <- runs + 1
test_that("seq_along of nothing runs no rounds", expect_equal(runs, ___))
