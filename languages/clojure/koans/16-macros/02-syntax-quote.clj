;; title: Syntax quote
;; intro: Syntax quote, `` ` ``, builds code like a template: `~` puts a value in and `~@` splices a sequence in. It also gives symbols their namespace.
(def x 5)
(is (= ___ `(+ 1 ~x)) "~ puts in a value; + gets its namespace")
(is (= ___ `[1 ~@[2 3] 4]) "~@ splices a sequence in")
(is (= ___ (eval `(+ 1 ~x))) "the result is code, ready to run")
