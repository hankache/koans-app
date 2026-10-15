# title: Splitting
# intro: `strsplit` splits each string of a vector, so it returns a list, one element per string. `[[1]]` takes the first.
parts <- strsplit("a,b,c", ",")
test_that("strsplit returns a list", expect_type(parts, ___))
test_that("its first element is a vector", expect_equal(parts[[1]], ___))
test_that("one result per string", expect_length(strsplit(c("a b", "c d e"), " "), ___))
test_that("split into characters", expect_equal(strsplit("hey", "")[[1]], ___))
test_that("the pattern is a regular expression", expect_equal(strsplit("a1b22c", "[0-9]+")[[1]], ___))
