# title: Special values
# intro: Dividing by zero gives `Inf`; a calculation that makes no sense gives `NaN`, "not a number". `NaN` counts as missing, so `is.na` is true for it.
test_that("dividing by zero", expect_equal(1 / 0, ___))
test_that("from the other side", expect_equal(-1 / 0, ___))
test_that("0 / 0 is not a number", expect_true(___))
test_that("NaN counts as missing", expect_true(___))
test_that("but NA is not NaN", expect_false(___))
test_that("is.finite rules them all out", expect_equal(is.finite(c(1, Inf, NA, NaN)), ___))
