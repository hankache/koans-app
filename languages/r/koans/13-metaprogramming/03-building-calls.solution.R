n <- 10
test_that("bquote fills in .() parts", expect_equal(deparse(bquote(x + .(n))), "x + 10"))
cl <- call("sum", 1, 2, 3)
test_that("call builds one from a name and arguments", expect_equal(deparse(cl), "sum(1, 2, 3)"))
test_that("which runs like any other", expect_equal(eval(cl), 6))
cl[[1]] <- as.name("max")
test_that("its parts can be changed", expect_equal(eval(cl), 3))
test_that("do.call builds and runs one", expect_equal(do.call(paste, list("a", "b", sep = "-")), "a-b"))
