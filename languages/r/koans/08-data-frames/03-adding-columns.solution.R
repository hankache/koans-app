people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

people$decade <- people$age %/% 10 * 10
test_that("a computed column", expect_equal(people$decade, c(30, 40, 80, 70)))
people$senior <- people$age >= 65
test_that("a logical column", expect_equal(sum(people$senior), 2))
people <- transform(people, initial = substr(name, 1, 1))
test_that("transform", expect_equal(people$initial, c("A", "A", "G", "E")))
people$decade <- NULL
test_that("NULL removes a column", expect_false("decade" %in% names(people)))
