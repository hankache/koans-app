;; title: Raising anything
;; intro: `raise` can raise any value, not only an error object. `guard` clauses can tell them apart, and an error no clause accepts goes on to the next handler out.
(define (classify thunk) (guard (e ((symbol? e) (list 'symbol e)) ((string? e) (list 'string e))) (thunk)))
(test-equal "a symbol" ___ (classify (lambda () (raise 'oops))))
(test-equal "a string" ___ (classify (lambda () (raise "bad"))))
(test-equal "a number gets past both" ___ (guard (e (#t 'outer)) (classify (lambda () (raise 42)))))
(test-equal "=> passes the test's value on" ___ (guard (e ((assq 'code e) => cdr)) (raise (list (cons 'code 42)))))
