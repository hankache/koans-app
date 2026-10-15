# title: Grouping
# intro: `tapply` applies a function to a column split by groups; `aggregate` does it with a formula and returns a data frame.
people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

test_that("tapply by group", expect_equal(tapply(people$age, people$city, max)[["London"]], ___))
means <- aggregate(age ~ city, data = people, FUN = mean)
test_that("aggregate returns a data frame", expect_equal(nrow(means), ___))
test_that("one row per group, sorted", expect_equal(means$city, ___))
test_that("with the means", expect_equal(means$age[means$city == "London"], ___))
test_that("split makes a list of groups", expect_length(split(people, people$city), ___))
