# title: Changing lists
# intro: Assign to a name to add or change an element, and assign `NULL` to remove it. Keep a `NULL` in a list with `list(NULL)`.
config <- list(theme = "light")
config$size <- 12
test_that("assign to add", expect_named(config, ___))
config$theme <- NULL
test_that("NULL removes", expect_named(config, ___))
config["empty"] <- list(NULL)
test_that("list(NULL) keeps a NULL", expect_length(config, ___))
test_that("a missing name is NULL", expect_null(___))
test_that("modifyList merges", expect_equal(modifyList(list(a = 1, b = 2), list(b = 3))$b, ___))
