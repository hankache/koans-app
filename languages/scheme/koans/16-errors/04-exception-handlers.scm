;; title: Exception handlers
;; intro: `with-exception-handler` installs a handler for the code it runs. With `raise-continuable`, the handler's value goes back to where the error was raised, and the code carries on.
(test-equal "the handler's value replaces the raise" ___ (with-exception-handler (lambda (e) 42) (lambda () (+ 1 (raise-continuable 'need-a-number)))))
(test-equal "the handler sees what was raised" ___ (with-exception-handler (lambda (e) e) (lambda () (raise-continuable 'need-a-number))))
(define cleaned #f)
(guard (e (#t #f)) (dynamic-wind (lambda () #f) (lambda () (error "fail")) (lambda () (set! cleaned #t))))
(test-equal "dynamic-wind cleans up after an error" ___ cleaned)
