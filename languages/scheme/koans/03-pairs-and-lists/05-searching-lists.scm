;; title: Searching lists
;; intro: `memq`, `memv` and `member` find an item and give the list from there on, or `#f`. They compare with `eq?`, `eqv?` and `equal?`.
(test-equal "memq gives the rest of the list from the item" ___ (memq 'c '(a b c d)))
(test-equal "or #f when it isn't there" ___ (memq 'z '(a b c)))
(test-equal "member compares with equal?, so it finds lists" ___ (member '(2) '(1 (2) 3)))
(test-equal "memq doesn't: a new list is never eq?" ___ (memq (list 2) '(1 (2) 3)))
(test-equal "the result works as a yes or no" ___ (if (memv 3 '(1 2 3)) 'found 'missing))
