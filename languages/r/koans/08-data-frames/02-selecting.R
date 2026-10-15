# title: Selecting
# intro: `df[rows, columns]` selects: rows by number or by a logical condition, columns by number or name. Leaving one side empty takes all.
people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

test_that("one cell", expect_equal(people[2, "name"], ___))
test_that("rows by a condition", expect_equal(people[people$age > 50, "name"], ___))
test_that("two conditions", expect_equal(people[people$city == "London" & people$age > 40, ]$name, ___))
test_that("subset reads more easily", expect_equal(subset(people, age < 40)$name, ___))
test_that("one column, kept as a data frame", expect_s3_class(people[, "age", drop = FALSE], ___))
