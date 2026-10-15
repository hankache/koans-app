x <- 1:6
attr(x, "unit") <- "cm"
test_that("your own attribute", expect_equal(attr(x, "unit"), "cm"))
dim(x) <- c(2, 3)
test_that("dim makes it a matrix", expect_true(is.matrix(x)))
test_that("attributes lists them all", expect_named(attributes(x), c("unit", "dim")))
y <- structure(1:3, names = c("a", "b", "c"))
test_that("structure sets attributes in one go", expect_equal(y[["c"]], 3L))
