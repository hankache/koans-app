test_that("a single value is recycled", expect_equal(c(1, 2, 3) + 1, c(2, 3, 4)))
test_that("a shorter vector too", expect_equal(1:6 * c(1, 10), c(1, 20, 3, 40, 5, 60)))
test_that("uneven lengths warn", expect_warning(1:3 + 1:2, "multiple"))
test_that("comparisons recycle", expect_equal(c(5, 15, 25) > 10, c(FALSE, TRUE, TRUE)))
