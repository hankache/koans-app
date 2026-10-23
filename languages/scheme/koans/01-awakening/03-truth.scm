;; title: Truth
;; intro: Only `#f` is false in Scheme. Everything else counts as true, even `0`, the empty string and the empty list.
(test-equal "zero is true" ___ (if 0 'yes 'no))
(test-equal "so is the empty list" ___ (if '() 'yes 'no))
(test-equal "#f is the only false value" ___ (if #f 'yes 'no))
(test-equal "not turns true into #f" ___ (not 3))
(test-equal "and gives its last value when all are true" ___ (and 1 2 3))
(test-equal "or gives the first true value" ___ (or #f 2 3))
