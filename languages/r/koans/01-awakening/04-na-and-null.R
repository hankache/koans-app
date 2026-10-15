# title: NA and NULL
# intro: `NA` is a missing value, and spreads through calculations: anything combined with an unknown is unknown. `NULL` is nothing at all, a vector of length zero.
test_that("NA spreads", expect_equal(NA + 1, ___))
test_that("is.na asks, element by element", expect_equal(is.na(c(1, NA, 3)), ___))
test_that("na.rm leaves the missing out", expect_equal(sum(c(1, NA, 3), na.rm = TRUE), ___))
test_that("NULL has no length", expect_length(NULL, ___))
test_that("c() ignores NULL", expect_equal(c(1, NULL, 2), ___))
test_that("is.null asks for NULL", expect_true(___))
