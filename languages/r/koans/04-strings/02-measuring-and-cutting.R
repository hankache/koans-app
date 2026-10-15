# title: Measuring and cutting
# intro: `nchar` counts characters, `substr` cuts a piece out by positions, counting from 1, and `trimws` trims spaces. All of them work on every string of a vector.
test_that("nchar counts characters", expect_equal(nchar("café"), ___))
test_that("element by element", expect_equal(nchar(c("a", "bb", "")), ___))
test_that("substr from and to", expect_equal(substr("enlightenment", 3, 7), ___))
test_that("trimws", expect_equal(trimws("  calm  "), ___))
test_that("startsWith", expect_true(___))
test_that("rev of the characters, by hand", expect_equal(paste(rev(strsplit("abc", "")[[1]]), collapse = ""), ___))
