;; title: Case
;; intro: `case` compares a value with lists of constants using `eqv?`, and runs the clause that holds it.
(define (kind n) (case n ((1 2 3) 'small) ((10 100) 'round) (else 'other)))
(test-equal "one of a list" ___ (kind 2))
(test-equal "another list" ___ (kind 100))
(test-equal "else" ___ (kind 7))
(test-equal "symbols work too" ___ (case 'e ((a e i o u) 'vowel) (else 'consonant)))
