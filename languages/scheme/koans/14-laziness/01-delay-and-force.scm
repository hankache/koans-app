;; title: Delay and force
;; intro: `delay` wraps an expression in a promise without evaluating it; `force` evaluates it the first time and remembers the value.
(define runs 0)
(define p (delay (begin (set! runs (+ runs 1)) 42)))
(test-equal "nothing has run yet" ___ runs)
(test-equal "force runs it" ___ (force p))
(force p)
(test-equal "but only once" ___ runs)
(test-equal "promise?" ___ (promise? p))
