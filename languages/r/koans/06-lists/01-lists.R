# title: Lists
# intro: A list holds values of any types, even other lists. `[[` and `$` take one element out; `[` returns a smaller list.
person <- list(name = "Ada", born = 1815, languages = c("English", "French"))
test_that("$ takes an element", expect_equal(person$name, ___))
test_that("[[ by name", expect_equal(person[["born"]], ___))
test_that("[ returns a list", expect_type(person["born"], ___))
test_that("[[ returns the element itself", expect_type(person[["born"]], ___))
test_that("elements can be vectors", expect_length(person$languages, ___))
test_that("names", expect_named(person, ___))
