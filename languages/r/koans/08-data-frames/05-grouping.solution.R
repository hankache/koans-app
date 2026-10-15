people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

test_that("tapply by group", expect_equal(tapply(people$age, people$city, max)[["London"]], 41))
means <- aggregate(age ~ city, data = people, FUN = mean)
test_that("aggregate returns a data frame", expect_equal(nrow(means), 3L))
test_that("one row per group, sorted", expect_equal(means$city, c("Austin", "London", "New York")))
test_that("with the means", expect_equal(means$age[means$city == "London"], 38.5))
test_that("split makes a list of groups", expect_length(split(people, people$city), 3))
