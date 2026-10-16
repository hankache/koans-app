df <- data.frame(x = 1:3, y = c(10, 20, 30))
test_that("eval looks names up among the columns", expect_equal(eval(quote(x + y), df), c(11, 22, 33)))
test_that("with does the same", expect_equal(with(df, sum(y[x > 1])), 50))
where <- function(data, test) data[eval(substitute(test), data), ]
test_that("a function can take a condition as code", expect_equal(where(df, y > 15)$x, c(2L, 3L)))
test_that("as subset does", expect_equal(nrow(subset(df, x != 2)), 2L))
test_that("a formula keeps code too", expect_equal(class(y ~ x), "formula"))
test_that("all.vars lists its names", expect_equal(all.vars(y ~ x + z), c("y", "x", "z")))
