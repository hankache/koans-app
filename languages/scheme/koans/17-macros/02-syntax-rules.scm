;; title: Syntax-rules
;; intro: `define-syntax` with `syntax-rules` defines a macro: each rule is a pattern and the code it rewrites to. The arguments aren't evaluated first, which a procedure can't do.
(define-syntax my-unless
  (syntax-rules ()
    ((_ test body ...) (if test #f (begin body ...)))))
(define-syntax swap!
  (syntax-rules ()
    ((_ a b) (let ((tmp a)) (set! a b) (set! b tmp)))))
(test-equal "the body runs when the test is false" ___ (my-unless #f 'ran))
(test-equal "and doesn't when it's true" ___ (my-unless #t (car '())))
(define x 1)
(define y 2)
(swap! x y)
(test-equal "swap! changes the variables themselves" ___ (list x y))
