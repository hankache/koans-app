;; title: Early exit
;; intro: An escape is how to stop a loop early, even one inside `for-each`, which has no way out of its own.
(define (first-negative lst)
  (call/cc
    (lambda (return)
      (for-each (lambda (x) (when (negative? x) (return x))) lst)
      'none)))
(define (product lst)
  (call/cc
    (lambda (return)
      (let loop ((lst lst))
        (cond ((null? lst) 1)
              ((= (car lst) 0) (return 0))
              (else (* (car lst) (loop (cdr lst)))))))))
(test-equal "found, and the loop stopped" ___ (first-negative '(3 -2 5 -7)))
(test-equal "not found" ___ (first-negative '(1 2)))
(test-equal "a zero ends the multiplying at once" ___ (product '(1 2 0 4)))
