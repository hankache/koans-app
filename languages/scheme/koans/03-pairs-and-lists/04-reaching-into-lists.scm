;; title: Reaching into lists
;; intro: `list-ref` takes an item by its index, counting from 0, and `list-tail` drops items from the front. `cadr` is the `car` of the `cdr`: the second item. Its cousins read the same way.
(define colors '(red green blue))
(test-equal "list-ref counts from 0" ___ (list-ref colors 1))
(test-equal "list-tail drops from the front" ___ (list-tail colors 2))
(test-equal "cadr: the car of the cdr" ___ (cadr colors))
(test-equal "caddr: the third" ___ (caddr colors))
(test-equal "cddr: all but the first two" ___ (cddr colors))
(test-equal "caar: the first of the first" ___ (caar '((1 2) (3 4))))
