# title: Errors
# intro: `stop()` signals an error. `expect_error(code, pattern)` runs the code and wants an error whose message matches the pattern.
test_that("stop signals an error", expect_error(stop("out of tea"), ___))
test_that("an undefined object is an error", expect_error(undefined_thing, ___))
test_that("so is adding text to a number", expect_error(1 + "a", ___))
test_that("tryCatch handles an error", {
  result <- tryCatch(stop("boom"), error = function(e) conditionMessage(e))
  expect_equal(result, ___)
})
