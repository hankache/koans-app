;; title: Lists are pairs
;; intro: A list is a chain of pairs ending in the empty list: `(1 2 3)` is `(cons 1 (cons 2 (cons 3 '())))`. So `cons` puts an item in front of a list, and `cdr` of a list is the rest of it.
(test-equal "cons onto the empty list" ___ (cons 3 '()))
(test-equal "a chain of pairs" ___ (cons 1 (cons 2 (cons 3 '()))))
(test-equal "cons puts an item in front" ___ (cons 0 '(1 2)))
(test-equal "cdr is the rest" ___ (cdr '(1 2 3)))
(test-equal "the rest of one item is the empty list" ___ (cdr '(1)))
(test-equal "cons of a list onto a list nests it" ___ (cons '(1 2) '(3)))
