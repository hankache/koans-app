# title: Sets
# intro: Vectors work as sets: `unique`, `union`, `intersect`, `setdiff`, and `%in%`, which asks of each element whether it's in another vector.
test_that("unique", expect_equal(unique(c(3, 1, 3, 2, 1)), ___))
test_that("%in% asks for each element", expect_equal(c(1, 5) %in% c(1, 2, 3), ___))
test_that("union", expect_equal(union(c(1, 2), c(2, 3)), ___))
test_that("intersect", expect_equal(intersect(1:5, 4:8), ___))
test_that("setdiff", expect_equal(setdiff(1:5, 2:3), ___))
test_that("duplicated marks repeats", expect_equal(duplicated(c("a", "b", "a")), ___))
test_that("expect_setequal ignores order", expect_setequal(c(3, 1, 2), ___))
