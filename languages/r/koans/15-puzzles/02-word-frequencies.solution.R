words <- strsplit("the cat and the hat and the bat", " ")[[1]]
freq <- table(words)
test_that("how often the word the appears", expect_equal(freq[["the"]], 3L))
test_that("a table is sorted by its values", expect_equal(names(freq), c("and", "bat", "cat", "hat", "the")))
test_that("sort orders it by count", expect_equal(names(sort(freq, decreasing = TRUE))[1:2], c("the", "and")))
test_that("how many in all", expect_equal(sum(freq), 8))
