;; title: Sets as lists
;; intro: A list without duplicates can serve as a set. Union, intersection and difference take a few lines each.
(define (union a b) (fold (lambda (x acc) (if (member x acc) acc (append acc (list x)))) a b))
(define (intersection a b) (filter (lambda (x) (member x b)) a))
(define (difference a b) (filter (lambda (x) (not (member x b))) a))
(test-equal "union: in either" ___ (union '(1 2 3) '(2 4)))
(test-equal "intersection: in both" ___ (intersection '(1 2 3) '(2 4)))
(test-equal "difference: in the first only" ___ (difference '(1 2 3) '(2 4)))
