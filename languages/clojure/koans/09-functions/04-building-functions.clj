;; title: Building functions
;; intro: `partial` fixes some arguments, `comp` chains functions from right to left, `juxt` applies several functions to one value, and `complement` reverses a predicate.
(is (= ___ ((partial + 10) 5)) "partial")
(is (= ___ ((comp inc #(* 2 %)) 5)) "comp runs right to left: double, then inc")
(is (= ___ ((juxt first last) [1 2 3])) "juxt")
(is (= ___ (filter (complement even?) [1 2 3])) "complement")
(is (= ___ ((constantly :same) 1 2 3)) "constantly ignores its arguments")
(is (= ___ (identity 5)) "identity gives back its argument")
