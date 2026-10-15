# title: Warnings and messages
# intro: Besides errors, R signals warnings, which let the code carry on, and messages, which inform. `suppressWarnings` and `suppressMessages` silence them.
check_age <- function(age) {
  if (age < 0) stop("age cannot be negative")
  if (age > 120) warning("that seems old")
  message("checked ", age)
  age
}
test_that("an error stops", expect_error(check_age(-1), ___))
test_that("a warning lets it go on", expect_warning(check_age(130), ___))
test_that("a message informs", expect_message(check_age(30), ___))
test_that("suppressMessages silences", expect_equal(suppressMessages(check_age(30)), ___))
