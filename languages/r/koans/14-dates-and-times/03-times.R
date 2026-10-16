# title: Times
# intro: `as.POSIXct` reads a date and time: a number of seconds since 1970, in a time zone. Adding a number adds seconds, and `difftime` measures the gap in hours or minutes.
t <- as.POSIXct("2026-10-16 14:30:00", tz = "UTC")
test_that("format writes the time", expect_equal(format(t, "%H:%M"), ___))
test_that("a time is seconds since 1970", expect_equal(as.numeric(as.POSIXct("1970-01-01 00:01:00", tz = "UTC")), ___))
test_that("adding a number adds seconds", expect_equal(format(t + 90, "%H:%M:%S"), ___))
later <- as.POSIXct("2026-10-16 18:00:00", tz = "UTC")
test_that("difftime in hours", expect_equal(as.numeric(difftime(later, t, units = "hours")), ___))
test_that("trunc rounds down to the hour", expect_equal(format(trunc(t, "hours"), "%H:%M"), ___))
test_that("as.Date keeps the day", expect_equal(as.Date(t), ___))
