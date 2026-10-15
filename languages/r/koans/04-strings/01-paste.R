# title: paste
# intro: `paste` joins strings with a space between, `paste0` with nothing. Both work element by element; `collapse` joins a whole vector into one string.
test_that("paste puts a space between", expect_equal(paste("a", "b"), ___))
test_that("sep chooses another", expect_equal(paste("a", "b", sep = "-"), ___))
test_that("paste0 puts nothing", expect_equal(paste0("x", 1:3), ___))
test_that("collapse joins a vector", expect_equal(paste(c("a", "b", "c"), collapse = ", "), ___))
test_that("toupper and tolower", expect_equal(toupper("koan"), ___))
