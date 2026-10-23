(define-record-type point
  (make-point x y)
  point?
  (x point-x)
  (y point-y))
(define p (make-point 3 4))
(test-equal "a field" 3 (point-x p))
(test-equal "another" 4 (point-y p))
(test-equal "the predicate" #t (point? p))
(test-equal "a pair is not a point" #f (point? (cons 3 4)))
