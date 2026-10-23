;; title: Code as data
;; intro: Clojure code is written in its own data structures: a call is a list. Quoting with `'` keeps code as data, and `eval` runs it.
(is (= ___ (count '(+ 1 2))) "a quoted call is a list of three items")
(is (= ___ (first '(+ 1 2))) "the first is a symbol")
(is (= ___ (eval '(+ 1 2))) "eval runs it")
(is (= ___ (list '* 2 3)) "code can be built like any list")
(is (= ___ (eval (list '* 2 3))) "and run")
(is (= ___ (read-string "[1 2]")) "read-string turns text into data")
