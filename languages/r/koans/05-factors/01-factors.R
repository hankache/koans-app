# title: Factors
# intro: A factor stores categories: integer codes plus a set of levels, sorted alphabetically unless you say otherwise. Values outside the levels become `NA`.
sizes <- factor(c("small", "large", "small", "medium"))
test_that("levels, sorted", expect_equal(levels(sizes), ___))
test_that("stored as integer codes", expect_equal(as.integer(sizes), ___))
test_that("nlevels", expect_equal(nlevels(sizes), ___))
test_that("a factor has its own class", expect_s3_class(sizes, ___))
ordered_sizes <- factor(c("small", "large"), levels = c("small", "medium", "large"))
test_that("levels in your own order", expect_equal(as.integer(ordered_sizes), ___))
test_that("an unknown value is NA", expect_true(___))
