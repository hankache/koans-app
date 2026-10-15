people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

by_age <- people[order(people$age), ]
test_that("by a column", expect_equal(by_age$name, c("Ada", "Alan", "Edsger", "Grace")))
oldest_first <- people[order(-people$age), ]
test_that("descending", expect_equal(oldest_first$name[1], "Grace"))
by_city <- people[order(people$city, -people$age), ]
test_that("by two columns", expect_equal(by_city$name, c("Edsger", "Alan", "Ada", "Grace")))
test_that("row names follow the rows", expect_equal(rownames(by_age)[4], "3"))
