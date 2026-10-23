;; title: Closures
;; intro: A procedure keeps the variables it could see where it was made, even after that code has finished. Each call that makes one gets its own.
(define (make-counter)
  (let ((n 0))
    (lambda () (set! n (+ n 1)) n)))
(define a (make-counter))
(define b (make-counter))
(a)
(a)
(test-equal "a remembers its count" ___ (a))
(test-equal "b has a count of its own" ___ (b))
