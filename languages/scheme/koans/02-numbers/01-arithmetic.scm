;; title: Arithmetic
;; intro: Arithmetic procedures take any number of arguments. `square`, `abs`, `min` and `max` do what their names say.
(test-equal "+ adds them all" ___ (+ 1 2 3 4))
(test-equal "* multiplies them all" ___ (* 1 2 3 4))
(test-equal "- subtracts the rest from the first" ___ (- 10 3 2))
(test-equal "square" ___ (square 7))
(test-equal "abs" ___ (abs -7))
(test-equal "max" ___ (max 3 9 4))
