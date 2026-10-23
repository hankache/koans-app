;; title: Tests
;; intro: Scheme code is tested with SRFI 64: `(test-equal "why" expected actual)` passes when the two are `equal?`, and `(test-assert "why" x)` when `x` is true. Replace each `___` so every test passes.
(test-equal "test-equal compares two values" ___ (+ 1 1))
(test-equal "strings are values too" ___ (string-append "Sch" "eme"))
(test-assert "test-assert wants a true value" ___)
(test-equal "a comparison gives #t or #f" ___ (> 1 2))
(test-equal "lists are equal when their items are" ___ (list 1 2))
