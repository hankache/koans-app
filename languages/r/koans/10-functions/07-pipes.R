# title: Pipes
# intro: R's native pipe, `|>`, passes the value on its left as the first argument of the call on its right, so steps read in order. `_` places it elsewhere, by name.
result <- c(4, 9, 16) |> sqrt() |> sum()
test_that("left to right", expect_equal(result, ___))
test_that("the same as nested calls", expect_equal(sum(sqrt(c(4, 9, 16))), ___))
test_that("_ names where the value goes", expect_equal(c(1, 5, 9) |> paste("x", y = _), ___))
fast_cars <- mtcars |> subset(hp > 250) |> rownames()
test_that("a data frame through a pipe", expect_equal(fast_cars, ___))
