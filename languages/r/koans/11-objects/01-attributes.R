# title: Attributes
# intro: Any object can carry attributes: names, dimensions, a class, or your own. A matrix is just a vector with a `dim` attribute.
x <- 1:6
attr(x, "unit") <- "cm"
test_that("your own attribute", expect_equal(attr(x, "unit"), ___))
dim(x) <- c(2, 3)
test_that("dim makes it a matrix", expect_true(___))
test_that("attributes lists them all", expect_named(attributes(x), ___))
y <- structure(1:3, names = c("a", "b", "c"))
test_that("structure sets attributes in one go", expect_equal(y[["c"]], ___))
