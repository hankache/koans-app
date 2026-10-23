;; title: Records
;; intro: `define-record-type` defines a new type: a constructor, a predicate, and a procedure to read each field.
(define-record-type point
  (make-point x y)
  point?
  (x point-x)
  (y point-y))
(define p (make-point 3 4))
(test-equal "a field" ___ (point-x p))
(test-equal "another" ___ (point-y p))
(test-equal "the predicate" ___ (point? p))
(test-equal "a pair is not a point" ___ (point? (cons 3 4)))
