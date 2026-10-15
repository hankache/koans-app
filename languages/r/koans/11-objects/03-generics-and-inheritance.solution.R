speak <- function(x) UseMethod("speak")
speak.animal <- function(x) "..."
speak.dog <- function(x) paste("Woof!", NextMethod())
speak.default <- function(x) "not an animal"
rex <- structure(list(), class = c("dog", "animal"))
tom <- structure(list(), class = c("cat", "animal"))
test_that("the dog method", expect_equal(speak(rex), "Woof! ..."))
test_that("a cat inherits from animal", expect_equal(speak(tom), "..."))
test_that("default for anything else", expect_equal(speak(42), "not an animal"))
test_that("inherits", expect_true(inherits(rex, "animal")))
