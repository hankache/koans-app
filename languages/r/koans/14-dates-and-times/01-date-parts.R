# title: Date parts
# intro: `format` picks a date's parts out with codes like `%d`, `%m` and `%Y`. `as.POSIXlt` splits a date into fields, counting years from 1900 and months from 0.
d <- as.Date("2026-10-16")
test_that("format picks parts out", expect_equal(format(d, "%d/%m/%Y"), ___))
test_that("weekdays names the day", expect_equal(weekdays(d), ___))
test_that("months names the month", expect_equal(months(d), ___))
lt <- as.POSIXlt(d)
test_that("POSIXlt counts years from 1900", expect_equal(lt$year, ___))
test_that("with January as 0", expect_equal(lt$mon, ___))
test_that("yday counts the days from 0 too", expect_equal(lt$yday, ___))
test_that("as.Date reads other formats", expect_equal(as.Date("16 Oct 2026", format = "%d %b %Y"), ___))
