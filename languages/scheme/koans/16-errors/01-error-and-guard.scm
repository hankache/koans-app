;; title: Error and guard
;; intro: `error` raises an error with a message and optional irritants. `guard` catches it: like `cond`, its clauses test the error, named here `e`.
(define (safe-div a b) (guard (e (#t 'cannot)) (if (= b 0) (error "division by zero") (quotient a b))))
(test-equal "no error" ___ (safe-div 10 2))
(test-equal "the error is caught" ___ (safe-div 1 0))
(test-error "test-error passes when its expression raises" #t ___)
