;; title: Mutual recursion
;; intro: Procedures can call each other. `letrec` defines local procedures that can see each other's names.
(define (my-even? n) (if (= n 0) #t (my-odd? (- n 1))))
(define (my-odd? n) (if (= n 0) #f (my-even? (- n 1))))
(test-equal "even calls odd calls even" ___ (my-even? 10))
(test-equal "and the other way" ___ (my-odd? 7))
(test-equal "tail calls, so deep is fine" ___ (my-even? 100001))
(test-equal "letrec, locally" ___ (letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 5)))
