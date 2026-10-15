log <- c()
with_cleanup <- function(fail) {
  on.exit(log <<- c(log, "cleaned up"))
  if (fail) stop("failed")
  log <<- c(log, "worked")
}
with_cleanup(FALSE)
test_that("on.exit runs after the body", expect_equal(log, c("worked", "cleaned up")))
try(with_cleanup(TRUE), silent = TRUE)
test_that("and after an error too", expect_equal(log[3], "cleaned up"))
old <- options(digits = 3)
on_digits <- format(pi)
options(old)
test_that("options can be changed and restored", expect_equal(on_digits, "3.14"))
