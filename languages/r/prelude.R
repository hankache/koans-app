# Run before every koan. The build wraps all of it in one eval(parse(text = "…")) on ONE line, so
# the koan's line numbers shift by exactly one; what it defines lives in the global environment,
# which the runner (public/runtime/r/worker.js) empties before every run.
#
# Koans are written the testthat way: test_that("description", { expect_equal(actual, expected) }).
# Like Raku's Test module, every expectation prints TAP: a failing one reports itself and the koan
# carries on, so every blank can be checked. A failure also reports the learner's line as
# "# at web line N". testthat puts the value you expect SECOND: expect_equal(-7 %/% 2, ___).

# ___: a unique value. Any expectation given it fails, whatever the expectation. (R names can't
# start with _, so the runner quotes every ___ in the koan as `___` before parsing it.)
`___` <- structure(list(), class = "koan_blank")
print.koan_blank <- function(x, ...) invisible(cat("___\n"))

.koan_tests <- 0L
.koan_desc <- NULL

.koan_is_blank <- function(...) any(vapply(list(...), inherits, logical(1), what = "koan_blank"))

# A value written the way you'd write it in R: c(1, 2), "text", list(a = 1), NULL.
.koan_show <- function(x) {
  if (inherits(x, "koan_blank")) return("___")
  paste(deparse(x, width.cutoff = 500L), collapse = " ")
}

# The koan's line that made this call: the innermost call that came from koan.R, or else the
# top-level expression the runner is evaluating.
.koan_line <- function() {
  for (call in rev(sys.calls())) {
    ref <- attr(call, "srcref")
    if (!is.null(ref) && identical(attr(ref, "srcfile")$filename, "koan.R") && ref[1] > 1) return(ref[1])
  }
  .koan_top_line()
}

.koan_report <- function(ok, call, diag = character()) {
  .koan_tests <<- .koan_tests + 1L
  desc <- if (is.null(.koan_desc)) .koan_show(call) else .koan_desc
  cat(if (ok) "ok " else "not ok ", .koan_tests, " - ", desc, "\n", sep = "")
  if (!ok) {
    for (d in diag) message("# ", d)
    message("# at web line ", .koan_line())
  }
  invisible(ok)
}

.koan_compare <- function(ok, expected, actual, call) {
  .koan_report(ok, call, c(paste("expected:", .koan_show(expected)), paste("     got:", .koan_show(actual))))
}

# A group of expectations about one thing, described in words: every expectation in it reports
# with that description.
test_that <- function(desc, code) {
  old <- .koan_desc
  .koan_desc <<- desc
  on.exit(.koan_desc <<- old)
  eval(substitute(code), new.env(parent = parent.frame()))
  invisible(TRUE)
}

# --- Equality

# Equal, allowing for floating-point error, and an integer equals the same double.
expect_equal <- function(object, expected, ..., tolerance = sqrt(.Machine$double.eps)) {
  call <- sys.call()
  if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
  .koan_compare(isTRUE(all.equal(expected, object, tolerance = tolerance, ...)), expected, object, call)
}

# Identical: the same type, value and attributes.
expect_identical <- function(object, expected) {
  call <- sys.call()
  if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
  .koan_compare(identical(object, expected), expected, object, call)
}

expect_true <- function(object) {
  call <- sys.call()
  if (.koan_is_blank(object)) return(.koan_report(FALSE, call))
  .koan_compare(identical(as.vector(object), TRUE), TRUE, object, call)
}

expect_false <- function(object) {
  call <- sys.call()
  if (.koan_is_blank(object)) return(.koan_report(FALSE, call))
  .koan_compare(identical(as.vector(object), FALSE), FALSE, object, call)
}

expect_null <- function(object) {
  call <- sys.call()
  if (.koan_is_blank(object)) return(.koan_report(FALSE, call))
  .koan_compare(is.null(object), NULL, object, call)
}

# --- Shape and type

expect_length <- function(object, n) {
  call <- sys.call()
  if (.koan_is_blank(object, n)) return(.koan_report(FALSE, call))
  .koan_compare(length(object) == n, n, length(object), call)
}

# typeof(): "double", "integer", "character", "logical", "list", "closure", …
expect_type <- function(object, type) {
  call <- sys.call()
  if (.koan_is_blank(object, type)) return(.koan_report(FALSE, call))
  .koan_compare(identical(typeof(object), type), type, typeof(object), call)
}

# An S3 class among class(object).
expect_s3_class <- function(object, class) {
  call <- sys.call()
  if (.koan_is_blank(object, class)) return(.koan_report(FALSE, call))
  .koan_compare(inherits(object, class), class, class(object), call)
}

expect_named <- function(object, expected) {
  call <- sys.call()
  if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
  .koan_compare(identical(names(object), expected), expected, names(object), call)
}

# --- Collections and text

expect_setequal <- function(object, expected) {
  call <- sys.call()
  if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
  .koan_compare(setequal(object, expected), expected, object, call)
}

expect_contains <- function(object, expected) {
  call <- sys.call()
  if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
  .koan_report(all(expected %in% object), call, paste(.koan_show(object), "does not contain", .koan_show(expected)))
}

# Every string in object matches the regular expression.
expect_match <- function(object, regexp, fixed = FALSE) {
  call <- sys.call()
  if (.koan_is_blank(object, regexp)) return(.koan_report(FALSE, call))
  .koan_report(length(object) > 0 && all(grepl(regexp, object, fixed = fixed)), call,
               paste(.koan_show(regexp), "does not match", .koan_show(object)))
}

# --- Comparison

.koan_order <- function(op, symbol) {
  function(object, expected) {
    call <- sys.call()
    if (.koan_is_blank(object, expected)) return(.koan_report(FALSE, call))
    .koan_report(isTRUE(op(object, expected)), call, paste(.koan_show(object), symbol, .koan_show(expected), "is not TRUE"))
  }
}
expect_gt <- .koan_order(`>`, ">")
expect_gte <- .koan_order(`>=`, ">=")
expect_lt <- .koan_order(`<`, "<")
expect_lte <- .koan_order(`<=`, "<=")

# --- Conditions and output: object is code, run by the expectation.

# An error, whose message matches regexp and whose class includes class, when given.
expect_error <- function(object, regexp = NULL, class = NULL) {
  call <- sys.call()
  if (.koan_is_blank(regexp, class)) return(.koan_report(FALSE, call))
  err <- tryCatch({ force(object); NULL }, error = function(e) e)
  if (is.null(err)) return(.koan_report(FALSE, call, c("expected: an error", "     got: no error")))
  ok <- (is.null(regexp) || grepl(regexp, conditionMessage(err))) && (is.null(class) || inherits(err, class))
  .koan_report(ok, call, c(paste("expected: an error", if (!is.null(regexp)) paste("matching", .koan_show(regexp)) else "",
                                 if (!is.null(class)) paste("of class", .koan_show(class)) else ""),
                           paste("     got:", .koan_show(conditionMessage(err)), "of class", .koan_show(class(err)[1]))))
}

expect_no_error <- function(object) {
  call <- sys.call()
  err <- tryCatch({ force(object); NULL }, error = function(e) e)
  .koan_report(is.null(err), call, c("expected: no error", paste("     got:", if (!is.null(err)) conditionMessage(err) else "")))
}

.koan_condition <- function(kind, muffle) {
  function(object, regexp = NULL) {
    call <- sys.call()
    if (.koan_is_blank(regexp)) return(.koan_report(FALSE, call))
    caught <- NULL
    withCallingHandlers(force(object), condition = function(c) {
      if (inherits(c, kind)) {
        if (is.null(caught)) caught <<- c
        invokeRestart(muffle)
      }
    })
    if (is.null(caught)) return(.koan_report(FALSE, call, c(paste("expected: a", kind), paste("     got: no", kind))))
    text <- trimws(conditionMessage(caught))
    .koan_compare(is.null(regexp) || grepl(regexp, text), regexp, text, call)
  }
}
expect_warning <- .koan_condition("warning", "muffleWarning")
expect_message <- .koan_condition("message", "muffleMessage")

# What printing object writes, as one string, matches regexp.
expect_output <- function(object, regexp) {
  call <- sys.call()
  if (.koan_is_blank(regexp)) return(.koan_report(FALSE, call))
  text <- paste(capture.output(invisible(force(object))), collapse = "\n")
  .koan_report(grepl(regexp, text), call, c(paste("expected: output matching", .koan_show(regexp)), paste("     got:", .koan_show(text))))
}
