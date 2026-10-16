# title: Arrays and outer
# intro: `outer` applies a function to every pair from two vectors, giving a matrix. `array` goes beyond two dimensions, filled first index first, and `apply` works along any of them.
products <- outer(1:3, 1:4)
test_that("outer makes every product", expect_equal(products[3, 4], ___))
test_that("one row per item of the first vector", expect_equal(dim(products), ___))
test_that("outer takes any function", expect_equal(outer(1:2, 1:3, "+")[2, ], ___))
cube <- array(1:24, dim = c(2, 3, 4))
test_that("an array can have three dimensions", expect_equal(cube[2, 3, 4], ___))
test_that("filled first index first", expect_equal(cube[2, 1, 1], ___))
test_that("apply along the third dimension", expect_equal(apply(cube, 3, sum)[1], ___))
