size <- function(n) if (n > 100) "big" else if (n > 10) "medium" else "small"
test_that("if returns a value", expect_equal(size(50), "medium"))
test_that("ifelse chooses element by element", expect_equal(ifelse(c(5, 50, 500) > 10, "yes", "no"), c("no", "yes", "yes")))
test_that("if wants a single value", expect_error(if (c(TRUE, FALSE)) 1, "length"))
test_that("and not NA", expect_error(if (NA) 1, "missing value"))
test_that("an if without else that doesn't run is NULL", expect_null(if (FALSE) 1))
