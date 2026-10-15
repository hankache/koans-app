# title: Sorting
# intro: `sort` returns the sorted values; `order` returns the positions that would sort them, which is how you sort one thing by another. `rev` reverses.
x <- c(30, 10, 20)
test_that("sort", expect_equal(sort(x), ___))
test_that("descending", expect_equal(sort(x, decreasing = TRUE), ___))
test_that("order gives positions", expect_equal(order(x), ___))
names <- c("cy", "al", "bo")
test_that("sort one vector by another", expect_equal(names[order(x)], ___))
test_that("rank", expect_equal(rank(x), ___))
test_that("rev", expect_equal(rev(1:3), ___))
