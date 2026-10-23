;; title: Range, take and drop
;; intro: `range` counts, `take` and `drop` cut a sequence from the front, and `take-last` and `butlast` work from the end.
(is (= ___ (range 5)) "range counts from 0")
(is (= ___ (range 2 8 2)) "a start, an end and a step")
(is (= ___ (take 3 (range 10))) "take")
(is (= ___ (drop 7 (range 10))) "drop")
(is (= ___ (take-last 2 (range 10))) "take-last")
(is (= ___ (butlast [1 2 3])) "butlast")
