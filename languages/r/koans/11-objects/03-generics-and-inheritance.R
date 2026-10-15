# title: Generics and inheritance
# intro: `UseMethod` makes your own generic. A class vector gives inheritance: the first class with a method wins, and `NextMethod` calls the next one.
speak <- function(x) UseMethod("speak")
speak.animal <- function(x) "..."
speak.dog <- function(x) paste("Woof!", NextMethod())
speak.default <- function(x) "not an animal"
rex <- structure(list(), class = c("dog", "animal"))
tom <- structure(list(), class = c("cat", "animal"))
test_that("the dog method", expect_equal(speak(rex), ___))
test_that("a cat inherits from animal", expect_equal(speak(tom), ___))
test_that("default for anything else", expect_equal(speak(42), ___))
test_that("inherits", expect_true(___))
