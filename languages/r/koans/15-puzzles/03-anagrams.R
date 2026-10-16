# title: Anagrams
# intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share, and `split` gathers the words by key.
words <- c("listen", "silent", "enlist", "google", "gooegl", "cat", "act")
key <- vapply(strsplit(words, ""), function(ch) paste(sort(ch), collapse = ""), "")
by_key <- split(words, key)
test_that("sorted letters are the key", expect_equal(by_key[["eilnst"]], ___))
test_that("split names them in sorted order", expect_equal(names(by_key), ___))
test_that("the size of each", expect_equal(unname(lengths(by_key)), ___))
