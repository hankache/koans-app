;; title: Run-length encoding
;; intro: Run-length encoding squeezes repeats into pairs of an item and a count: `(a a a b)` becomes `((a . 3) (b . 1))`.
(define (encode lst)
  (if (null? lst)
      '()
      (let loop ((rest (cdr lst)) (current (car lst)) (n 1) (acc '()))
        (cond ((null? rest) (reverse (cons (cons current n) acc)))
              ((eqv? (car rest) current) (loop (cdr rest) current (+ n 1) acc))
              (else (loop (cdr rest) (car rest) 1 (cons (cons current n) acc)))))))
(define (decode pairs) (append-map (lambda (p) (make-list (cdr p) (car p))) pairs))
(test-equal "each run becomes a pair" ___ (encode '(a a a b)))
(test-equal "runs, not equal items" ___ (encode '(x y y x)))
(test-equal "and back" ___ (decode '((c . 2) (d . 1))))
