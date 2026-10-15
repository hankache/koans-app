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
test_that("the handler's value is the result", expect_equal(result, "caught: careful"))
test_that("the code stopped at the warning", expect_equal(log, c("start", "finally")))
safe_log <- function(x) tryCatch(log(x), warning = function(w) NA)
test_that("a warning turned into NA", expect_equal(safe_log(-1), NA))
test_that("try returns an error object", expect_s3_class(try(stop("x"), silent = TRUE), "try-error"))
