# title: Data frames
# intro: A data frame is a list of columns of the same length: a table. `nrow`, `ncol` and `names` describe it, and `$` takes a column.
people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

test_that("rows and columns", {
  expect_equal(nrow(people), ___)
  expect_equal(ncol(people), ___)
})
test_that("$ takes a column", expect_equal(people$age, ___))
test_that("a column is a vector", expect_equal(mean(people$age), ___))
test_that("a data frame is a list", expect_type(people, ___))
test_that("its class", expect_s3_class(people, ___))
