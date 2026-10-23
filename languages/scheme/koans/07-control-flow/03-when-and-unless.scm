;; title: When, unless, and, or
;; intro: `when` runs its body only if its test is true, and `unless` only if it's false. `and` stops at the first false value, `or` at the first true one.
(define log '())
(when (> 3 1) (set! log (cons 'when log)))
(unless (> 3 1) (set! log (cons 'unless log)))
(test-equal "only when ran" ___ log)
(test-equal "and gives #f at the first false value" ___ (and 1 #f (car '())))
(test-equal "or stops at the first true value" ___ (or 'first (car '())))
(test-equal "and with no arguments" ___ (and))
