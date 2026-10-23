;; title: Reduce
;; intro: `reduce` folds a sequence into one value with a function of two arguments, starting from the first item, or from a value you give it.
(is (= ___ (reduce + [1 2 3 4])) "sum")
(is (= ___ (reduce + 100 [1 2 3 4])) "with a starting value")
(is (= ___ (reduce max [3 1 4 1])) "the largest")
(is (= ___ (reduce conj '() [1 2 3])) "building a list")
(is (= ___ (reduce (fn [m k] (update m k (fnil inc 0))) {} [:a :b :a])) "counting with a map")
(is (= ___ (reductions + [1 2 3])) "reductions shows every step")
