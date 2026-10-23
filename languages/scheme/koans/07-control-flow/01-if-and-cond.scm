;; title: If and cond
;; intro: `if` takes a test and two branches. `cond` tries its clauses in order and runs the first whose test is true; `else` catches the rest.
(define (sign n) (cond ((< n 0) 'negative) ((= n 0) 'zero) (else 'positive)))
(test-equal "if picks a branch" ___ (if (> 10 5) 'big 'small))
(test-equal "the first true clause wins" ___ (sign -3))
(test-equal "the next" ___ (sign 0))
(test-equal "else takes the rest" ___ (sign 8))
(test-equal "=> passes the test's value to a procedure" ___ (cond ((assv 'b '((a 1) (b 2))) => cadr) (else #f)))
