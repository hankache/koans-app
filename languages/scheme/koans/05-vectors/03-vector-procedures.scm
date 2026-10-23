;; title: Vector procedures
;; intro: `vector-map` and `vector-for-each` work like their list cousins, and `vector-append` and `vector-copy` build new vectors.
(test-equal "vector-map" ___ (vector-map square #(1 2 3)))
(test-equal "vector-append" ___ (vector-append #(1) #(2 3)))
(test-equal "vector-copy can take a range" ___ (vector-copy #(a b c d) 1 3))
(define total 0)
(vector-for-each (lambda (x) (set! total (+ total x))) #(1 2 3))
(test-equal "vector-for-each runs for every item" ___ total)
