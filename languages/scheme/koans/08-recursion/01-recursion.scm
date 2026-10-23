;; title: Recursion
;; intro: A recursive procedure handles the simplest case directly and every other case with a call to itself on something smaller.
(define (factorial n) (if (= n 0) 1 (* n (factorial (- n 1)))))
(define (my-length lst) (if (null? lst) 0 (+ 1 (my-length (cdr lst)))))
(test-equal "factorial" ___ (factorial 5))
(test-equal "the simplest case" ___ (factorial 0))
(test-equal "recursion on a list" ___ (my-length '(a b c)))
(test-equal "the empty list is the simplest list" ___ (my-length '()))
