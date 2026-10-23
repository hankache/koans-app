;; title: Pairs
;; intro: `cons` makes a pair of two values; `car` gives the first and `cdr` the second. A pair whose second value isn't a list is written with a dot: `(1 . 2)`.
(define p (cons 1 2))
(test-equal "car is the first" ___ (car p))
(test-equal "cdr is the second" ___ (cdr p))
(test-equal "a pair is written with a dot" ___ p)
(test-equal "pair?" ___ (pair? p))
(test-equal "the empty list is not a pair" ___ (pair? '()))
