# title: Logical vectors
# intro: `&` and `|` work element by element; `&&` and `||` want single values. `which` gives the positions of the `TRUE`s, and `any` and `all` sum them up. `sum` of a logical vector counts the `TRUE`s.
x <- c(3, 8, 1, 9)
test_that("& element by element", expect_equal(x > 2 & x < 9, ___))
test_that("which gives positions", expect_equal(which(x > 5), ___))
test_that("any and all", {
  expect_true(___)
  expect_false(___)
})
test_that("sum counts TRUEs", expect_equal(sum(x > 2), ___))
test_that("&& wants single values", expect_error(c(TRUE, FALSE) && TRUE, ___))
