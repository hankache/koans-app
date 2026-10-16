# title: Run-length encoding
# intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. R has it built in: `rle` finds the runs, and `inverse.rle` undoes them.
r <- rle(strsplit("aaabcc", "")[[1]])
test_that("rle finds how long each run is", expect_equal(r$lengths, ___))
test_that("and their values", expect_equal(r$values, ___))
test_that("pasted together", expect_equal(paste0(r$lengths, r$values, collapse = ""), ___))
test_that("inverse.rle undoes it", expect_equal(paste(inverse.rle(r), collapse = ""), ___))
test_that("the longest run of ones", expect_equal(max(rle(c(1, 1, 0, 1, 1, 1, 0))$lengths), ___))
