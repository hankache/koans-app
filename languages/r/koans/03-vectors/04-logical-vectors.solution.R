x <- c(3, 8, 1, 9)
test_that("& element by element", expect_equal(x > 2 & x < 9, c(TRUE, TRUE, FALSE, FALSE)))
test_that("which gives positions", expect_equal(which(x > 5), c(2L, 4L)))
test_that("any and all", {
  expect_true(any(x > 8))
  expect_false(all(x > 2))
})
test_that("sum counts TRUEs", expect_equal(sum(x > 2), 3))
test_that("&& wants single values", expect_error(c(TRUE, FALSE) && TRUE, "length"))
