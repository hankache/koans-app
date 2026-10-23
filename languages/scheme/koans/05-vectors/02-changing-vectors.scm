;; title: Changing vectors
;; intro: `vector-set!` changes an item in place. Procedures that change things end in `!`, a warning to the reader. A vector written literally, like `#(1 2)`, is a constant: change only vectors you made.
(define v (make-vector 3 0))
(test-equal "make-vector fills it" ___ v)
(vector-set! v 0 'start)
(test-equal "vector-set! changes one item" ___ v)
(vector-fill! v 7)
(test-equal "vector-fill! changes them all" ___ v)
(define copy (vector-copy v))
(vector-set! copy 0 1)
(test-equal "a copy changes alone" ___ (vector-ref v 0))
