data <- list(user = list(name = "Ada", address = list(city = "London")))
test_that("$ chains", expect_equal(data$user$address$city, "London"))
test_that("[[ with a path", expect_equal(data[[c("user", "address", "city")]], "London"))
data$user$address$city <- "Paris"
test_that("assign deep inside", expect_equal(data$user$address$city, "Paris"))
test_that("str shows the shape", expect_output(str(data), "List of 1"))
