# title: S3 classes
# intro: S3 is R's simplest object system: an object is a list (or anything) with a `class` attribute, and a generic like `print` or `format` calls the method named `generic.class`.
new_money <- function(amount, currency) structure(list(amount = amount, currency = currency), class = "money")
format.money <- function(x, ...) sprintf("%.2f %s", x$amount, x$currency)
print.money <- function(x, ...) cat(format(x), "\n")
price <- new_money(9.5, "EUR")
test_that("a class attribute", expect_s3_class(price, ___))
test_that("format.money is used for format()", expect_equal(format(price), ___))
test_that("and print.money for print()", expect_output(print(price), ___))
test_that("underneath, still a list", expect_equal(unclass(price)$amount, ___))
