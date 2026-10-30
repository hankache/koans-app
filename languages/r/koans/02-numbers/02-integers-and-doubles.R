# title: Integers and doubles
# intro: Most numbers in R are doubles. Integers, written with `L`, are 32-bit: past `.Machine$integer.max`, integer arithmetic gives `NA` with a warning.
test_that("a sequence with `:` is integer", expect_type(1:3, ___))
test_that("but doubles are the default", expect_type(c(1, 2, 3), ___))
test_that("integers are 32-bit", expect_equal(.Machine$integer.max, ___))
test_that("going past it gives NA", expect_warning(.Machine$integer.max + 1L, ___))
test_that("a double has room", expect_equal(.Machine$integer.max + 1, ___))
test_that("is.integer asks", expect_false(___))
