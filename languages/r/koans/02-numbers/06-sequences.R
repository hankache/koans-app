# title: Sequences
# intro: `:` counts by one, `seq` counts in any step or to a given length, and `rep` repeats. `seq_len` and `seq_along` make safe loop indexes, even for nothing.
test_that("seq with a step", expect_equal(seq(0, 10, by = 5), ___))
test_that("seq with a length", expect_equal(seq(0, 1, length.out = 3), ___))
test_that("rep repeats", expect_equal(rep(c("a", "b"), times = 2), ___))
test_that("or repeats each", expect_equal(rep(c("a", "b"), each = 2), ___))
test_that("1:0 counts down, a trap in loops", expect_equal(1:0, ___))
test_that("seq_len(0) is empty, as it should be", expect_length(seq_len(0), ___))
