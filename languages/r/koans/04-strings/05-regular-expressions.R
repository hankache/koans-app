# title: Regular expressions
# intro: `grepl` asks whether a pattern matches, `sub` replaces the first match and `gsub` all of them, with `\\1` for groups; `regmatches` extracts what matched.
test_that("grepl asks", expect_equal(grepl("^a", c("apple", "banana")), ___))
test_that("sub replaces the first", expect_equal(sub("o", "0", "foo"), ___))
test_that("gsub replaces all", expect_equal(gsub("o", "0", "foo"), ___))
test_that("groups in the replacement", expect_equal(sub("(\\w+) (\\w+)", "\\2, \\1", "Ada Lovelace"), ___))
test_that("regmatches extracts", expect_equal(regmatches("a1b22c333", gregexpr("[0-9]+", "a1b22c333"))[[1]], ___))
test_that("expect_match", expect_match("2026-10-15", ___))
