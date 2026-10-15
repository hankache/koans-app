test_that("stop signals an error", expect_error(stop("out of tea"), "tea"))
test_that("an undefined object is an error", expect_error(undefined_thing, "not found"))
test_that("so is adding text to a number", expect_error(1 + "a", "non-numeric"))
test_that("tryCatch handles an error", {
  result <- tryCatch(stop("boom"), error = function(e) conditionMessage(e))
  expect_equal(result, "boom")
})
