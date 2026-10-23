;; title: Take-while and drop-while
;; intro: `take-while` and `drop-while` cut a sequence where a predicate stops holding; `split-with` does both at once.
(is (= ___ (take-while #(< % 3) [1 2 3 1])) "take-while stops at the first failure")
(is (= ___ (drop-while #(< % 3) [1 2 3 1])) "drop-while skips until then")
(is (= ___ (split-with odd? [1 3 2 5])) "split-with does both")
(is (= ___ (split-at 2 [1 2 3])) "split-at cuts at a position")
(is (= ___ (take-while #(< % 20) (iterate #(* 2 %) 2))) "a finite piece of an infinite sequence")
