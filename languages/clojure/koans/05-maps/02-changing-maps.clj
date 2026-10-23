;; title: Changing maps
;; intro: `assoc` adds or replaces keys, `dissoc` removes them, and `update` applies a function to one value. Each returns a new map.
(is (= ___ (assoc {:a 1} :b 2)) "assoc adds a key")
(is (= ___ (dissoc {:a 1 :b 2} :b)) "dissoc removes one")
(is (= ___ (update {:n 5} :n inc)) "update applies a function to a value")
(is (= ___ (update {:n 5} :n + 10)) "and passes extra arguments on")
(is (= ___ (merge {:a 1 :b 2} {:b 3 :c 4})) "merge: the right side wins")
