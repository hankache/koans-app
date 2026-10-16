# title: Evaluating in data
# intro: `eval` can look names up in a data frame, which is how `with` and `subset` let you write column names bare. A function can take a condition as code with `substitute`, and do the same.
df <- data.frame(x = 1:3, y = c(10, 20, 30))
test_that("eval looks names up among the columns", expect_equal(eval(quote(x + y), df), ___))
test_that("with does the same", expect_equal(with(df, sum(y[x > 1])), ___))
where <- function(data, test) data[eval(substitute(test), data), ]
test_that("a function can take a condition as code", expect_equal(where(df, y > 15)$x, ___))
test_that("as subset does", expect_equal(nrow(subset(df, x != 2)), ___))
test_that("a formula keeps code too", expect_equal(class(y ~ x), ___))
test_that("all.vars lists its names", expect_equal(all.vars(y ~ x + z), ___))
