;; title: Equivalence
;; intro: Scheme has three equalities: `eq?` asks whether two things are the very same object, `eqv?` also compares numbers and characters, and `equal?` compares contents, all the way down.
(test-equal "the same symbol is always eq?" ___ (eq? 'a 'a))
(test-equal "two new lists are different objects" ___ (eq? (list 1 2) (list 1 2)))
(test-equal "but their contents are equal" ___ (equal? (list 1 2) (list 1 2)))
(test-equal "eqv? compares numbers" ___ (eqv? 100 100))
(test-equal "equal? compares strings" ___ (equal? "abc" "abc"))
(test-equal "the empty list is one object" ___ (eq? '() '()))
