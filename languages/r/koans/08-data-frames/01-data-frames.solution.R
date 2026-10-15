people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

test_that("rows and columns", {
  expect_equal(nrow(people), 4L)
  expect_equal(ncol(people), 3L)
})
test_that("$ takes a column", expect_equal(people$age, c(36, 41, 85, 72)))
test_that("a column is a vector", expect_equal(mean(people$age), 58.5))
test_that("a data frame is a list", expect_type(people, "list"))
test_that("its class", expect_s3_class(people, "data.frame"))
