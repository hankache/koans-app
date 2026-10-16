# title: Quoting
# intro: `quote` keeps code without running it: a call, which is a list of parts. `eval` runs it later, in whatever environment you choose; `deparse` turns it back into text.
e <- quote(x * 2 + 1)
test_that("quote keeps code as a call", expect_equal(class(e), ___))
test_that("whose first part is the function", expect_equal(as.character(e[[1]]), ___))
test_that("deparse turns it back into a string", expect_equal(deparse(e), ___))
x <- 5
test_that("eval runs it here", expect_equal(eval(e), ___))
test_that("or with other values", expect_equal(eval(e, list(x = 10)), ___))
test_that("parse turns a string into code", expect_equal(eval(parse(text = "1 + 2")), ___))
