(define-syntax my-or
  (syntax-rules ()
    ((_) #f)
    ((_ e) e)
    ((_ e rest ...) (let ((t e)) (if t t (my-or rest ...))))))
(define-syntax my-list-of-pairs
  (syntax-rules ()
    ((_ (k v) ...) (list (cons 'k v) ...))))
(test-equal "the first true value" 3 (my-or #f 3 4))
(test-equal "none" #f (my-or))
(test-equal "... repeats a pattern" '((a . 1) (b . 2)) (my-list-of-pairs (a 1) (b 2)))
