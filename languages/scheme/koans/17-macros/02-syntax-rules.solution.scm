(define-syntax my-unless
  (syntax-rules ()
    ((_ test body ...) (if test #f (begin body ...)))))
(define-syntax swap!
  (syntax-rules ()
    ((_ a b) (let ((tmp a)) (set! a b) (set! b tmp)))))
(test-equal "the body runs when the test is false" 'ran (my-unless #f 'ran))
(test-equal "and doesn't when it's true" #f (my-unless #t (car '())))
(define x 1)
(define y 2)
(swap! x y)
(test-equal "swap! changes the variables themselves" '(2 1) (list x y))
