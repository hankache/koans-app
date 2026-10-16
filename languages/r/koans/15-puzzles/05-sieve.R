# title: The sieve of Eratosthenes
# intro: To find every prime up to n, cross out the multiples of each prime in turn. Whatever is left uncrossed is prime, and `which` says where.
primes_up_to <- function(n) {
  is_prime <- rep(TRUE, n)
  is_prime[1] <- FALSE
  for (i in seq_len(floor(sqrt(n)))) {
    if (i > 1 && is_prime[i]) is_prime[seq(i * i, n, by = i)] <- FALSE
  }
  which(is_prime)
}
test_that("the primes up to 20", expect_equal(primes_up_to(20), ___))
test_that("how many up to 100", expect_equal(length(primes_up_to(100)), ___))
test_that("their total up to 10", expect_equal(sum(primes_up_to(10)), ___))
