;; title: Sorted collections
;; intro: `sorted-set` and `sorted-map` keep their items in order, whatever order they arrive in. `sorted-set-by` takes your own comparison.
(is (= ___ (seq (sorted-set 3 1 2))) "a sorted set")
(is (= ___ (keys (sorted-map :c 3 :a 1 :b 2))) "a sorted map, by key")
(is (= ___ (first (sorted-set 3 1 2))) "its first is the smallest")
(is (= ___ (seq (sorted-set "pear" "fig" "apple"))) "strings sort alphabetically")
(is (= ___ (seq (sorted-set-by > 1 2 3))) "sorted-set-by takes a comparison")
