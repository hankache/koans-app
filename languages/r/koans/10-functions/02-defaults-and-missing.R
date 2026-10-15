# title: Defaults and missing arguments
# intro: Arguments can have defaults, which may refer to other arguments. `missing()` asks whether one was given. Partial names match too, though it's best not to rely on it.
greet <- function(name = "world", punct = if (name == "world") "." else "!") paste0("Hello, ", name, punct)
test_that("defaults", expect_equal(greet(), ___))
test_that("a default that depends on another argument", expect_equal(greet("Ada"), ___))
describe <- function(x, y) if (missing(y)) "one" else "two"
test_that("missing", expect_equal(describe(1), ___))
test_that("a missing argument without a default is an error when used", expect_error((function(x) x)(), ___))
