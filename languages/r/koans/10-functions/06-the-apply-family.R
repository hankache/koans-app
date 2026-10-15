# title: The apply family
# intro: `lapply` applies a function to each element and returns a list; `sapply` simplifies the result; `vapply` simplifies to a type you declare; `mapply` and `Map` walk several vectors together.
test_that("lapply returns a list", expect_type(lapply(1:3, function(x) x^2), ___))
test_that("sapply simplifies", expect_equal(sapply(1:3, function(x) x^2), ___))
test_that("vapply declares the type", expect_equal(vapply(list(1:3, 4:9), length, integer(1)), ___))
test_that("mapply walks two vectors", expect_equal(mapply(function(a, b) a * b, 1:3, 4:6), ___))
test_that("Filter keeps", expect_equal(Filter(function(x) x %% 2 == 0, 1:6), ___))
test_that("Reduce combines", expect_equal(Reduce(`*`, 1:5), ___))
test_that("Reduce can accumulate", expect_equal(Reduce(`+`, 1:4, accumulate = TRUE), ___))
