;; title: Combining sequences
;; intro: `concat` joins sequences, `interleave` alternates them, `interpose` puts a separator between items, and `partition` cuts a sequence into groups.
(is (= ___ (concat [1 2] [3 4])) "concat joins")
(is (= ___ (interleave [:a :b] [1 2])) "interleave alternates")
(is (= ___ (interpose "," ["a" "b"])) "interpose puts a separator between")
(is (= ___ (flatten [1 [2 [3 4]]])) "flatten removes the nesting")
(is (= ___ (partition 2 [1 2 3 4])) "partition cuts into groups")
(is (= ___ (partition-all 2 [1 2 3])) "partition-all keeps the leftovers")
