# title: Built-in data
# intro: R comes with datasets to practice on: `mtcars`, `iris`, `airquality` and more. `head` shows the first rows, `summary` describes columns.
test_that("mtcars has 32 cars", expect_equal(nrow(mtcars), ___))
test_that("its row names are the cars", expect_equal(rownames(mtcars)[1], ___))
test_that("cars with 6 cylinders", expect_equal(sum(mtcars$cyl == 6), ___))
test_that("iris has three species", expect_equal(nlevels(iris$Species), ___))
test_that("airquality has missing values", expect_equal(sum(is.na(airquality$Ozone)), ___))
test_that("the mean, leaving them out", expect_equal(round(mean(airquality$Ozone, na.rm = TRUE), 1), ___))
