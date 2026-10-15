# title: Matrices
# intro: A matrix is a vector with dimensions. `matrix` fills it column by column unless told `byrow = TRUE`.
m <- matrix(1:6, nrow = 2)
test_that("dimensions", expect_equal(dim(m), ___))
test_that("filled by column", expect_equal(m[, 2], ___))
test_that("one element", expect_equal(m[2, 3], ___))
b <- matrix(1:6, nrow = 2, byrow = TRUE)
test_that("or by row", expect_equal(b[1, ], ___))
test_that("still a vector underneath", expect_equal(length(m), ___))
