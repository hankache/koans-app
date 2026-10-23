;; title: Expressions
;; intro: Every Scheme expression is either a value or a list: `(+ 1 2)` calls `+` with the arguments `1` and `2`. The operator always comes first, so nesting replaces precedence rules.
(test-equal "the operator comes first" ___ (+ 1 2 3))
(test-equal "the inner list runs first" ___ (+ 2 (* 3 4)))
(test-equal "so nesting sets the order" ___ (* (+ 2 3) 4))
(test-equal "- with one argument negates" ___ (- 5))
(test-equal "comparisons take several arguments" ___ (< 1 2 3))
