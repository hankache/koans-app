# title: Names and stacking
# intro: `setNames` names a vector or list in one go; `names<-` does it by assignment. A named list of vectors can be stacked into a data frame.
x <- setNames(1:3, c("a", "b", "c"))
test_that("setNames", expect_equal(x[["b"]], ___))
names(x)[2] <- "B"
test_that("assign to names", expect_named(x, ___))
scores <- list(ada = c(9, 7), alan = 8)
s <- stack(scores)
test_that("stack makes a long table", expect_equal(nrow(s), ___))
test_that("its columns", expect_named(s, ___))
