;; title: Integer division
;; intro: `quotient` divides and drops the remainder, rounding toward zero; `remainder` has the sign of the number divided, and `modulo` the sign of the divisor. `floor/` gives a quotient and a remainder at once.
(test-equal "quotient drops the remainder" ___ (quotient 17 5))
(test-equal "remainder is what's left" ___ (remainder 17 5))
(test-equal "quotient rounds toward zero" ___ (quotient -7 2))
(test-equal "remainder takes the sign of the number divided" ___ (remainder -7 2))
(test-equal "modulo takes the sign of the divisor" ___ (modulo -7 2))
(test-equal "floor/ gives both, as two values" ___ (call-with-values (lambda () (floor/ 7 3)) list))
