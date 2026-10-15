# title: switch
# intro: `switch` picks a value by name. Names without a value fall through to the next one with a value, and an unnamed last argument is the default.
sound <- function(animal) switch(animal, cat = "meow", dog = , wolf = "woof", "...")
test_that("by name", expect_equal(sound("cat"), ___))
test_that("dog falls through to wolf", expect_equal(sound("dog"), ___))
test_that("the default", expect_equal(sound("fish"), ___))
test_that("with a number, by position", expect_equal(switch(2, "a", "b", "c"), ___))
