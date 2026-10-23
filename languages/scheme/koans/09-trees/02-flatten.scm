;; title: Flatten
;; intro: Flattening a tree turns it into a list of its leaves, in order.
(define (flatten tree)
  (cond ((null? tree) '())
        ((pair? tree) (append (flatten (car tree)) (flatten (cdr tree))))
        (else (list tree))))
(test-equal "flatten" ___ (flatten '(1 (2 (3)) 4)))
(test-equal "already flat" ___ (flatten '(a b)))
(test-equal "empty lists vanish" ___ (flatten '(() (x) ())))
