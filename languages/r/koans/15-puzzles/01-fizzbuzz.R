# title: FizzBuzz
# intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. In R, `ifelse` does it for a whole vector at once.
fizzbuzz <- function(n) {
  ifelse(n %% 15 == 0, "FizzBuzz", ifelse(n %% 3 == 0, "Fizz", ifelse(n %% 5 == 0, "Buzz", n)))
}
test_that("a multiple of 3", expect_equal(fizzbuzz(9), ___))
test_that("a multiple of both", expect_equal(fizzbuzz(30), ___))
test_that("neither: the number itself", expect_equal(fizzbuzz(7), ___))
test_that("mixed with words, the numbers become text", expect_equal(fizzbuzz(1:5), ___))
test_that("how many FizzBuzz up to 100", expect_equal(sum(fizzbuzz(1:100) == "FizzBuzz"), ___))
