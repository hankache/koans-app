;; title: Ellipses and recursive macros
;; intro: `...` after a pattern matches it any number of times. A macro can expand into a use of itself, one step smaller each time.
(define-syntax my-or
  (syntax-rules ()
    ((_) #f)
    ((_ e) e)
    ((_ e rest ...) (let ((t e)) (if t t (my-or rest ...))))))
(define-syntax my-list-of-pairs
  (syntax-rules ()
    ((_ (k v) ...) (list (cons 'k v) ...))))
(test-equal "the first true value" ___ (my-or #f 3 4))
(test-equal "none" ___ (my-or))
(test-equal "... repeats a pattern" ___ (my-list-of-pairs (a 1) (b 2)))
