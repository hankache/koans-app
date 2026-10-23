;; title: Building lists
;; intro: `list` makes a list of its arguments, `append` joins lists, `reverse` turns one around and `length` counts its items.
(test-equal "list" ___ (list 1 2 3))
(test-equal "list keeps a list argument as one item" ___ (list 1 '(2 3)))
(test-equal "append joins lists" ___ (append '(1 2) '(3) '(4)))
(test-equal "reverse" ___ (reverse '(1 2 3)))
(test-equal "length" ___ (length '()))
(test-equal "make-list" ___ (make-list 3 'x))
