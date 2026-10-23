;; title: Apply
;; intro: `apply` calls a procedure with a list of arguments. Extra arguments before the list are passed first.
(test-equal "apply spreads a list into arguments" ___ (apply + '(1 2 3 4)))
(test-equal "extra arguments come first" ___ (apply + 1 2 '(3 4)))
(test-equal "the largest of a list" ___ (apply max '(3 9 4)))
(test-equal "joining a list of strings" ___ (apply string-append '("a" "b" "c")))
