;; title: Lazy sequences
;; intro: Many sequences are lazy: `map`, `filter`, `range` and `iterate` compute their items only as they're needed, so a sequence can even be infinite.
(is (= ___ (take 3 (range))) "(range) never ends; take stops it")
(is (= ___ (take 4 (iterate #(* 2 %) 1))) "iterate applies a function again and again")
(is (= ___ (take 3 (cycle [:a :b]))) "cycle repeats a collection")
(is (= ___ (repeat 3 1)) "repeat")
(is (= ___ (first (filter #(> % 100) (range)))) "only what's needed is computed")
