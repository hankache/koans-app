;; title: Memoization
;; intro: A closure can remember results, so a slow procedure computes each answer only once.
(define calls 0)
(define (slow-square n) (set! calls (+ calls 1)) (* n n))
(define (memoize f)
  (let ((cache '()))
    (lambda (n)
      (let ((hit (assv n cache)))
        (if hit
            (cdr hit)
            (let ((result (f n))) (set! cache (cons (cons n result) cache)) result))))))
(define fast-square (memoize slow-square))
(fast-square 4)
(test-equal "the same answer" ___ (fast-square 4))
(test-equal "computed once" ___ calls)
