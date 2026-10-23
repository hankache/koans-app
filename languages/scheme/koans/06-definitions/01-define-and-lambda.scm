;; title: Define and lambda
;; intro: `lambda` makes a procedure, and `define` names a value. `(define (f x) …)` is a shorter way to write `(define f (lambda (x) …))`.
(define square-it (lambda (x) (* x x)))
(define (double x) (* 2 x))
(test-equal "a procedure made by lambda" ___ (square-it 5))
(test-equal "the shorter form" ___ (double 5))
(test-equal "lambda can be called right away" ___ ((lambda (a b) (+ a b)) 3 4))
(test-equal "procedures are values" ___ (procedure? double))
