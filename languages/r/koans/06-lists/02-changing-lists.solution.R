config <- list(theme = "light")
config$size <- 12
test_that("assign to add", expect_named(config, c("theme", "size")))
config$theme <- NULL
test_that("NULL removes", expect_named(config, "size"))
config["empty"] <- list(NULL)
test_that("list(NULL) keeps a NULL", expect_length(config, 2))
test_that("a missing name is NULL", expect_null(config$nothing))
test_that("modifyList merges", expect_equal(modifyList(list(a = 1, b = 2), list(b = 3))$b, 3))
