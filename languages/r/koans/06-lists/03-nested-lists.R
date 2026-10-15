# title: Nested lists
# intro: Lists nest, and `[[` chains to reach inside. `[[` also takes a vector of names, one per level.
data <- list(user = list(name = "Ada", address = list(city = "London")))
test_that("$ chains", expect_equal(data$user$address$city, ___))
test_that("[[ with a path", expect_equal(data[[c("user", "address", "city")]], ___))
data$user$address$city <- "Paris"
test_that("assign deep inside", expect_equal(data$user$address$city, ___))
test_that("str shows the shape", expect_output(str(data), ___))
