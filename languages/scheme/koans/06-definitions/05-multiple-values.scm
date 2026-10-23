;; title: Multiple values
;; intro: A procedure can return several values with `values`. `call-with-values`, `let-values` and `define-values` receive them.
(define (divide a b) (values (quotient a b) (remainder a b)))
(test-equal "call-with-values passes them on" ___ (call-with-values (lambda () (divide 17 5)) list))
(test-equal "let-values names them" ___ (let-values (((q r) (divide 17 5))) (+ q r)))
(define-values (whole left) (divide 20 6))
(test-equal "define-values defines them" ___ whole)
(test-equal "the other one" ___ left)
