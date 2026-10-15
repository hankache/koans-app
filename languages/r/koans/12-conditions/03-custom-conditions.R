# title: Custom conditions
# intro: A condition is a list with a message and a class vector. Signalling one of your own classes lets callers handle exactly that problem.
out_of_stock <- function(item) {
  structure(class = c("out_of_stock", "error", "condition"),
            list(message = paste(item, "is out of stock"), call = sys.call(-1), item = item))
}
buy <- function(item) stop(out_of_stock(item))
handled <- tryCatch(buy("tea"), out_of_stock = function(e) e$item)
test_that("handled by its class", expect_equal(handled, ___))
test_that("expect_error with a class", expect_error(buy("cake"), class = ___))
test_that("its message", expect_error(buy("jam"), ___))
