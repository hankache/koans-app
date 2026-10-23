;; title: Streams
;; intro: A stream is a list whose rest is a promise, so it can go on forever: each item is computed only when it's needed.
(define (integers-from n) (cons n (delay (integers-from (+ n 1)))))
(define (stream-take s k) (if (= k 0) '() (cons (car s) (stream-take (force (cdr s)) (- k 1)))))
(define (stream-filter pred s)
  (if (pred (car s))
      (cons (car s) (delay (stream-filter pred (force (cdr s)))))
      (stream-filter pred (force (cdr s)))))
(test-equal "the first items of an endless stream" ___ (stream-take (integers-from 5) 3))
(test-equal "filtered, still endless" ___ (stream-take (stream-filter (lambda (n) (= 0 (remainder n 3))) (integers-from 0)) 4))
