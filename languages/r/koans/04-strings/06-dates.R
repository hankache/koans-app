# title: Dates
# intro: `as.Date` reads dates; they're days since 1970 underneath, so arithmetic works. `format` writes them out, and `seq` makes runs of them.
d <- as.Date("2026-10-15")
test_that("the day of the week", expect_equal(format(d, "%A"), ___))
test_that("add days", expect_equal(d + 17, ___))
test_that("days between", expect_equal(as.numeric(as.Date("2026-12-25") - d), ___))
test_that("a date is a number of days", expect_equal(as.numeric(as.Date("1970-01-11")), ___))
test_that("seq by month", expect_equal(format(seq(d, by = "month", length.out = 3), "%b"), ___))
