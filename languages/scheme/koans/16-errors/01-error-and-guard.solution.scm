(define (safe-div a b) (guard (e (#t 'cannot)) (if (= b 0) (error "division by zero") (quotient a b))))
(test-equal "no error" 5 (safe-div 10 2))
(test-equal "the error is caught" 'cannot (safe-div 1 0))
(test-error "test-error passes when its expression raises" #t (error "boom"))
