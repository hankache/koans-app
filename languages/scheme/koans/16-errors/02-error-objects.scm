;; title: Error objects
;; intro: An error raised by `error` is an error object: `error-object-message` and `error-object-irritants` give back what it was made with.
(define (caught thunk) (guard (e ((error-object? e) e)) (thunk)))
(define e (caught (lambda () (error "Out of stock:" 'tea 3))))
(test-equal "an error object" ___ (error-object? e))
(test-equal "its message" ___ (error-object-message e))
(test-equal "its irritants" ___ (error-object-irritants e))
