;; title: Association lists
;; intro: An association list is a list of pairs, each a key and a value. `assq`, `assv` and `assoc` find the pair for a key, comparing with `eq?`, `eqv?` and `equal?`.
(define ages '((ada . 36) (alan . 41)))
(test-equal "assq finds the pair" ___ (assq 'ada ages))
(test-equal "cdr gives its value" ___ (cdr (assq 'alan ages)))
(test-equal "#f for a missing key" ___ (assq 'grace ages))
(test-equal "assoc compares with equal?, so strings work" ___ (assoc "b" '(("a" . 1) ("b" . 2))))
