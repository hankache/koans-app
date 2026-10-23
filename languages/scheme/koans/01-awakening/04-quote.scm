;; title: Quote
;; intro: A quote, `'`, stops Scheme from evaluating: `'(+ 1 2)` is a list of three items, not a call, and `'x` is the symbol `x`, not the variable.
(define x 10)
(test-equal "x is a variable" ___ x)
(test-equal "'x is the symbol itself" ___ 'x)
(test-equal "a quoted call is a list" ___ (length '(+ 1 2)))
(test-equal "its first item is a symbol" ___ (car '(+ 1 2)))
(test-assert "symbol? asks" (symbol? ___))
