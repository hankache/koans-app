# title: Equality
# intro: `==` compares element by element and gives a logical vector. `identical` asks whether two objects are exactly the same, and `all.equal` allows for floating-point error.
test_that("== compares element by element", expect_equal(c(1, 2, 3) == c(1, 5, 3), ___))
test_that("floating point is approximate", expect_false(___))
test_that("expect_equal allows for it", expect_equal(0.1 + 0.2, ___))
test_that("identical is exact, type included", expect_false(___))
test_that("isTRUE(all.equal()) is the tolerant test", expect_true(___))
