# title: Matrix arithmetic
# intro: `*` multiplies element by element; `%*%` is matrix multiplication. `t` transposes, `diag` makes an identity, and `solve` inverts.
a <- matrix(c(1, 2, 3, 4), nrow = 2)
test_that("* is element by element", expect_equal((a * a)[2, 2], ___))
test_that("%*% is matrix multiplication", expect_equal((a %*% a)[1, 1], ___))
test_that("t transposes", expect_equal(t(a)[1, 2], ___))
test_that("an identity matrix", expect_equal(diag(2) %*% a, ___))
test_that("solve inverts", expect_equal(solve(a) %*% a, ___))
