# title: Environments
# intro: An environment holds named values, like a list, but it is never copied: a function that changes one changes the original. Every closure keeps the environment it was made in.
env <- new.env()
assign("count", 1, envir = env)
env$count <- env$count + 1
test_that("new.env makes a place for named values", expect_equal(get("count", envir = env), ___))
test_that("exists asks whether a name is there", expect_equal(exists("other", envir = env, inherits = FALSE), ___))
bump <- function(e) e$count <- e$count + 10
bump(env)
test_that("a function changes the original", expect_equal(env$count, ___))
make_counter <- function() {
  i <- 0
  function() {
    i <<- i + 1
    i
  }
}
counter <- make_counter()
first <- counter()
test_that("a closure keeps the variables around it", expect_equal(get("i", envir = environment(counter)), ___))
test_that("local runs code somewhere fresh", expect_equal(local({ y <- 5; y * 2 }), ___))
test_that("and leaves nothing behind", expect_equal(exists("y", inherits = FALSE), ___))
