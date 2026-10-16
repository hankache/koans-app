# title: Word frequencies
# intro: `table` counts how often each value appears, sorted by value. Sorting the table itself orders it by count.
words <- strsplit("the cat and the hat and the bat", " ")[[1]]
freq <- table(words)
test_that("how often the word the appears", expect_equal(freq[["the"]], ___))
test_that("a table is sorted by its values", expect_equal(names(freq), ___))
test_that("sort orders it by count", expect_equal(names(sort(freq, decreasing = TRUE))[1:2], ___))
test_that("how many in all", expect_equal(sum(freq), ___))
