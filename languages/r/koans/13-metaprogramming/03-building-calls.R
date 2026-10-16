# title: Building calls
# intro: `bquote` quotes code but fills in the parts written `.()`. `call` builds a call from a function's name and arguments, and a call's parts can be changed like a list's.
n <- 10
test_that("bquote fills in .() parts", expect_equal(deparse(bquote(x + .(n))), ___))
cl <- call("sum", 1, 2, 3)
test_that("call builds one from a name and arguments", expect_equal(deparse(cl), ___))
test_that("which runs like any other", expect_equal(eval(cl), ___))
cl[[1]] <- as.name("max")
test_that("its parts can be changed", expect_equal(eval(cl), ___))
test_that("do.call builds and runs one", expect_equal(do.call(paste, list("a", "b", sep = "-")), ___))
