;; title: Parameters
;; intro: A dot before the last parameter gathers the remaining arguments into a list, and `case-lambda` defines a procedure with a different body for each number of arguments.
(define (count-args . args) (length args))
(define (first-and-rest first . rest) (list first rest))
(define greet (case-lambda (() "Hello!") ((name) (string-append "Hello, " name "!"))))
(test-equal "all the arguments, as a list" ___ (count-args 'a 'b 'c))
(test-equal "or none" ___ (count-args))
(test-equal "one named, the rest gathered" ___ (first-and-rest 1 2 3))
(test-equal "case-lambda with no arguments" ___ (greet))
(test-equal "and with one" ___ (greet "Ada"))
