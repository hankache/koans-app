;; title: Map and filter
;; intro: `map` applies a function to every item, `filter` keeps the items a predicate likes, and `remove` keeps the others.
(is (= ___ (map inc [1 2 3])) "map")
(is (= ___ (filter even? [1 2 3 4])) "filter")
(is (= ___ (remove even? [1 2 3 4])) "remove")
(is (= ___ (map + [1 2] [10 20])) "map can walk several sequences side by side")
(is (= ___ (keep #(when (odd? %) (* % %)) [1 2 3])) "keep maps, then drops the nils")
(is (= ___ (map-indexed vector [:a :b])) "map-indexed passes the position too")
