# title: Adding columns
# intro: Assign to a new column name to add one, computed from the others, vectorized. `transform` and `within` do several at once.
people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

people$decade <- people$age %/% 10 * 10
test_that("a computed column", expect_equal(people$decade, ___))
people$senior <- people$age >= 65
test_that("a logical column", expect_equal(sum(people$senior), ___))
people <- transform(people, initial = substr(name, 1, 1))
test_that("transform", expect_equal(people$initial, ___))
people$decade <- NULL
test_that("NULL removes a column", expect_false(___))
