# title: S4 classes
# intro: S4 classes are formal: `setClass` declares slots with types, `new` makes objects, `@` reads slots, and `setGeneric` with `setMethod` define methods. A validity function checks objects.
setClass("Point", representation(x = "numeric", y = "numeric"),
         validity = function(object) if (length(object@x) != 1) "x must be one number" else TRUE)
p <- new("Point", x = 3, y = 4)
test_that("@ reads a slot", expect_equal(p@y, ___))
test_that("slots are typed", expect_error(new("Point", x = "a", y = 1), ___))
test_that("validity is checked", expect_error(new("Point", x = c(1, 2), y = 1), ___))
setGeneric("norm2", function(p) standardGeneric("norm2"))
setMethod("norm2", "Point", function(p) sqrt(p@x^2 + p@y^2))
test_that("an S4 method", expect_equal(norm2(p), ___))
test_that("isVirtualClass", expect_false(___))
