# title: on.exit
# intro: `on.exit` registers code to run when a function exits, normally or by an error, which is how R functions clean up after themselves.
log <- c()
with_cleanup <- function(fail) {
  on.exit(log <<- c(log, "cleaned up"))
  if (fail) stop("failed")
  log <<- c(log, "worked")
}
with_cleanup(FALSE)
test_that("on.exit runs after the body", expect_equal(log, ___))
try(with_cleanup(TRUE), silent = TRUE)
test_that("and after an error too", expect_equal(log[3], ___))
old <- options(digits = 3)
on_digits <- format(pi)
options(old)
test_that("options can be changed and restored", expect_equal(on_digits, ___))
