;; title: Filter and fold
;; intro: SRFI 1, the list library almost every Scheme provides, adds `filter`, which keeps the items a predicate accepts, and `fold`, which combines a list into one value: `(fold kons start list)` calls `(kons item result-so-far)`.
(test-equal "filter" ___ (filter even? '(1 2 3 4)))
(test-equal "fold sums" ___ (fold + 0 '(1 2 3 4)))
(test-equal "fold sees the items in order, so cons reverses" ___ (fold cons '() '(1 2 3)))
(test-equal "reduce starts from the first item" ___ (reduce max 0 '(3 9 4)))
(test-equal "iota counts" ___ (iota 4))
