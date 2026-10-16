fizzbuzz <- function(n) {
  ifelse(n %% 15 == 0, "FizzBuzz", ifelse(n %% 3 == 0, "Fizz", ifelse(n %% 5 == 0, "Buzz", n)))
}
test_that("a multiple of 3", expect_equal(fizzbuzz(9), "Fizz"))
test_that("a multiple of both", expect_equal(fizzbuzz(30), "FizzBuzz"))
test_that("neither: the number itself", expect_equal(fizzbuzz(7), 7))
test_that("mixed with words, the numbers become text", expect_equal(fizzbuzz(1:5), c("1", "2", "Fizz", "4", "Buzz")))
test_that("how many FizzBuzz up to 100", expect_equal(sum(fizzbuzz(1:100) == "FizzBuzz"), 6))
