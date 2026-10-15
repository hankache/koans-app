# title: Vectorized thinking
# intro: R code is fastest and shortest when it works on whole vectors instead of looping. Most loops have a one-line vectorized version.
prices <- c(10, 25, 40)
quantities <- c(3, 1, 2)
test_that("a total without a loop", expect_equal(sum(prices * quantities), ___))
test_that("a discount on the expensive ones", expect_equal(ifelse(prices > 20, prices * 0.9, prices), ___))
scores <- c(55, 72, 91, 38)
test_that("count the passes", expect_equal(sum(scores >= 50), ___))
test_that("the share that passed", expect_equal(mean(scores >= 50), ___))
test_that("pmax compares in pairs", expect_equal(pmax(c(1, 5), c(4, 2)), ___))
