;; title: Vectors
;; intro: A vector, `#(1 2 3)`, holds its items side by side, so `vector-ref` reaches any of them at once. Indexes count from 0.
(define v (vector 'a 'b 'c))
(test-equal "vector-ref counts from 0" ___ (vector-ref v 1))
(test-equal "vector-length" ___ (vector-length v))
(test-equal "a vector is written with #" ___ (vector 1 2))
(test-equal "vector->list" ___ (vector->list v))
(test-equal "list->vector" ___ (list->vector '(x y)))
