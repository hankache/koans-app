;; title: Grouping and counting
;; intro: `frequencies` counts each value, `group-by` gathers items by a function's result, and `partition-by` splits a sequence where the result changes.
(is (= ___ (frequencies [:a :b :a])) "frequencies")
(is (= ___ (group-by odd? [1 2 3])) "group-by")
(is (= ___ (group-by count ["a" "bb" "c"])) "by length")
(is (= ___ (partition-by odd? [1 3 2 4 5])) "partition-by")
(is (= ___ (apply max-key count ["a" "bb" "c"])) "max-key finds the largest by a function")
