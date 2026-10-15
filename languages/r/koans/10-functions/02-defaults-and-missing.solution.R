greet <- function(name = "world", punct = if (name == "world") "." else "!") paste0("Hello, ", name, punct)
test_that("defaults", expect_equal(greet(), "Hello, world."))
test_that("a default that depends on another argument", expect_equal(greet("Ada"), "Hello, Ada!"))
describe <- function(x, y) if (missing(y)) "one" else "two"
test_that("missing", expect_equal(describe(1), "one"))
test_that("a missing argument without a default is an error when used", expect_error((function(x) x)(), "missing"))
