;; title: Mapping a tree
;; intro: The same idea builds a new tree with the shape of the old one, changing every leaf.
(define (tree-map f tree)
  (cond ((null? tree) '())
        ((pair? tree) (cons (tree-map f (car tree)) (tree-map f (cdr tree))))
        (else (f tree))))
(define (depth tree) (if (pair? tree) (max (+ 1 (depth (car tree))) (depth (cdr tree))) 0))
(test-equal "every leaf doubled, the shape kept" ___ (tree-map (lambda (x) (* 2 x)) '(1 (2 3) 4)))
(test-equal "how deep a tree goes" ___ (depth '(1 (2 (3)))))
(test-equal "a flat list is one level" ___ (depth '(1 2 3)))
