# title: tryCatch
# intro: `tryCatch` runs code with handlers for conditions by class: the first that matches handles it, and the code stops there. `finally` always runs.
log <- c()
result <- tryCatch(
  {
    log <- c(log, "start")
    warning("careful")
    log <- c(log, "never")
  },
  warning = function(w) paste("caught:", conditionMessage(w)),
  finally = log <- c(log, "finally")
)
test_that("the handler's value is the result", expect_equal(result, ___))
test_that("the code stopped at the warning", expect_equal(log, ___))
safe_log <- function(x) tryCatch(log(x), warning = function(w) NA)
test_that("a warning turned into NA", expect_equal(safe_log(-1), ___))
test_that("try returns an error object", expect_s3_class(try(stop("x"), silent = TRUE), ___))
