make_counter <- function() {
  count <- 0
  function() {
    count <<- count + 1
    count
  }
}
counter <- make_counter()
counter()
test_that("the counter keeps its count", expect_equal(counter(), 2))
test_that("each counter has its own", expect_equal(make_counter()(), 1))
adders <- lapply(1:3, function(n) function(x) x + n)
test_that("each adder remembers its n", expect_equal(adders[[3]](10), 13))
test_that("environment(f) is where it was made", expect_equal(environment(counter)$count, 2))
