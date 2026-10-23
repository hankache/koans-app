;; title: Map and for-each
;; intro: `map` applies a procedure to every item and gives a list of the results; with several lists, it walks them side by side. `for-each` does the same for the effects only.
(test-equal "map" ___ (map (lambda (x) (+ x 1)) '(1 2 3)))
(test-equal "map with a built-in procedure" ___ (map square '(1 2 3)))
(test-equal "map over two lists" ___ (map + '(1 2) '(10 20)))
(define seen '())
(for-each (lambda (x) (set! seen (cons x seen))) '(a b c))
(test-equal "for-each, in order" ___ seen)
