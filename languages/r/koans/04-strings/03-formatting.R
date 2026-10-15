# title: Formatting
# intro: `sprintf` formats with a template, like C's; `format` and `formatC` control digits, widths and separators.
test_that("sprintf", expect_equal(sprintf("%s is %d", "Ada", 36L), ___))
test_that("decimals", expect_equal(sprintf("%.2f", pi), ___))
test_that("padding", expect_equal(sprintf("%05d", 42L), ___))
test_that("vectorized", expect_equal(sprintf("item %d", 1:2), ___))
test_that("a thousands separator", expect_equal(format(1234567, big.mark = ","), ___))
test_that("formatC widths", expect_equal(formatC(3.14159, digits = 3, format = "f"), ___))
