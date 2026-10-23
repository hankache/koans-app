;; title: Searching with procedures
;; intro: `find` gives the first item a predicate accepts, and `any` and `every` ask whether some or all of them pass. All three come from SRFI 1.
(test-equal "find" ___ (find (lambda (x) (> x 3)) '(1 4 5)))
(test-equal "find gives #f when nothing matches" ___ (find (lambda (x) (> x 9)) '(1 4 5)))
(test-equal "any" ___ (any odd? '(2 3 4)))
(test-equal "every" ___ (every odd? '(1 2 3)))
(test-equal "every of nothing is true" ___ (every odd? '()))
