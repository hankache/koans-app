x <- setNames(1:3, c("a", "b", "c"))
test_that("setNames", expect_equal(x[["b"]], 2L))
names(x)[2] <- "B"
test_that("assign to names", expect_named(x, c("a", "B", "c")))
scores <- list(ada = c(9, 7), alan = 8)
s <- stack(scores)
test_that("stack makes a long table", expect_equal(nrow(s), 3L))
test_that("its columns", expect_named(s, c("values", "ind")))
