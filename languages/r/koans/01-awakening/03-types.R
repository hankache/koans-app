# title: Types
# intro: Every vector has one type, given by `typeof`: "double", "integer", "character", "logical" and more. Combining types converts them all to the most flexible one.
test_that("numbers are doubles by default", expect_type(3, ___))
test_that("L makes an integer", expect_type(3L, ___))
test_that("quotes make characters", expect_type("3", ___))
test_that("TRUE and FALSE are logical", expect_type(TRUE, ___))
test_that("mixing numbers and text gives text", expect_equal(c(1, "a"), ___))
test_that("TRUE counts as 1", expect_equal(c(TRUE, 2), ___))
