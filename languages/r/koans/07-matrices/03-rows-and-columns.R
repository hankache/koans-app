# title: Rows and columns
# intro: `rowSums`, `colMeans` and friends summarize along one dimension; `apply` does the same with any function, `1` for rows and `2` for columns.
m <- matrix(1:6, nrow = 2)
test_that("rowSums", expect_equal(rowSums(m), ___))
test_that("colMeans", expect_equal(colMeans(m), ___))
test_that("apply over rows", expect_equal(apply(m, 1, max), ___))
test_that("apply over columns", expect_equal(apply(m, 2, function(col) col[2] - col[1]), ___))
test_that("cbind adds a column", expect_equal(ncol(cbind(m, 7:8)), ___))
