# title: cut and ordered factors
# intro: `cut` turns numbers into a factor of ranges. An ordered factor knows its levels have an order, so its values can be compared.
ages <- c(5, 17, 42, 70)
groups <- cut(ages, breaks = c(0, 12, 19, 64, Inf), labels = c("child", "teen", "adult", "senior"))
test_that("cut into ranges", expect_equal(as.character(groups), ___))
test_that("by default, ranges include the right end", expect_equal(as.character(cut(12, c(0, 12, 19))), ___))
heat <- factor(c("mild", "hot", "cold"), levels = c("cold", "mild", "hot"), ordered = TRUE)
test_that("ordered factors compare", expect_equal(heat > "cold", ___))
test_that("and have a max", expect_equal(as.character(max(heat)), ___))
