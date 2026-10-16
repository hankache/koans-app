# title: Date arithmetic
# intro: `difftime` measures the time between dates in the units you choose. `seq` steps through dates by day, week or month, and `cut` groups dates into periods.
gap <- difftime(as.Date("2026-12-25"), as.Date("2026-10-16"), units = "weeks")
test_that("difftime measures in weeks if asked", expect_equal(as.numeric(gap), ___))
test_that("and remembers them", expect_equal(units(gap), ___))
test_that("seq by week", expect_equal(format(seq(as.Date("2026-03-02"), by = "week", length.out = 3), "%d"), ___))
test_that("a month after the 31st of January", expect_equal(format(seq(as.Date("2026-01-31"), by = "month", length.out = 2)[2], "%m-%d"), ___))
days <- as.Date(c("2026-01-05", "2026-01-20", "2026-02-01"))
test_that("cut groups dates by month", expect_equal(as.character(cut(days, "month")), ___))
test_that("dates compare", expect_equal(as.Date("2026-01-01") < as.Date("2025-12-31"), ___))
