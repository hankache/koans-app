# title: Conversion
# intro: The `as.*` functions convert. A string that isn't a number becomes `NA`, with a warning; `as.integer` truncates.
test_that("text to a number", expect_equal(as.numeric("3.5"), ___))
test_that("a number that isn't", expect_warning(as.numeric("three"), ___))
test_that("and the result is NA", expect_equal(suppressWarnings(as.numeric("three")), ___))
test_that("as.integer truncates", expect_equal(as.integer(3.9), ___))
test_that("logical to number", expect_equal(as.numeric(c(TRUE, FALSE)), ___))
test_that("number to text", expect_equal(as.character(1e6), ___))
