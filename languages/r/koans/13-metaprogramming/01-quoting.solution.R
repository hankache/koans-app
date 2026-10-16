e <- quote(x * 2 + 1)
test_that("quote keeps code as a call", expect_equal(class(e), "call"))
test_that("whose first part is the function", expect_equal(as.character(e[[1]]), "+"))
test_that("deparse turns it back into a string", expect_equal(deparse(e), "x * 2 + 1"))
x <- 5
test_that("eval runs it here", expect_equal(eval(e), 11))
test_that("or with other values", expect_equal(eval(e, list(x = 10)), 21))
test_that("parse turns a string into code", expect_equal(eval(parse(text = "1 + 2")), 3))
