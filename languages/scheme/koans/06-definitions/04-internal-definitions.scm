;; title: Internal definitions
;; intro: A `define` inside a body is local to it, and `set!` changes the value of a name that already exists.
(define (hypotenuse-squared a b)
  (define (sq n) (* n n))
  (+ (sq a) (sq b)))
(test-equal "a helper defined inside" ___ (hypotenuse-squared 3 4))
(define counter 0)
(set! counter (+ counter 1))
(set! counter (+ counter 1))
(test-equal "set! changes a value" ___ counter)
(test-error "sq is local: it doesn't exist out here" #t ___)
