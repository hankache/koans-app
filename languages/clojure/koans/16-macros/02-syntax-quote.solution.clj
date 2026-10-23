(def x 5)
(is (= '(clojure.core/+ 1 5) `(+ 1 ~x)) "~ puts in a value; + gets its namespace")
(is (= [1 2 3 4] `[1 ~@[2 3] 4]) "~@ splices a sequence in")
(is (= 6 (eval `(+ 1 ~x))) "the result is code, ready to run")
