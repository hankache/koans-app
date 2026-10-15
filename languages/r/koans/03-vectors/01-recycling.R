# title: Recycling
# intro: When two vectors of different lengths meet, the shorter one is repeated to match. A length that doesn't divide evenly still works, with a warning.
test_that("a single value is recycled", expect_equal(c(1, 2, 3) + 1, ___))
test_that("a shorter vector too", expect_equal(1:6 * c(1, 10), ___))
test_that("uneven lengths warn", expect_warning(1:3 + 1:2, ___))
test_that("comparisons recycle", expect_equal(c(5, 15, 25) > 10, ___))
