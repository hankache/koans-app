# title: if and ifelse
# intro: `if` wants a single `TRUE` or `FALSE` and returns a value, so it can be assigned. `ifelse` is the vectorized version, choosing element by element.
size <- function(n) if (n > 100) "big" else if (n > 10) "medium" else "small"
test_that("if returns a value", expect_equal(size(50), ___))
test_that("ifelse chooses element by element", expect_equal(ifelse(c(5, 50, 500) > 10, "yes", "no"), ___))
test_that("if wants a single value", expect_error(if (c(TRUE, FALSE)) 1, ___))
test_that("and not NA", expect_error(if (NA) 1, ___))
test_that("an if without else that doesn't run is NULL", expect_null(___))
