;; title: Set operations
;; intro: `clojure.set`, here as `set/`, combines sets: `union`, `intersection` and `difference`. `subset?` compares them.
(require '[clojure.set :as set])
(is (= ___ (set/union #{1 2} #{2 3})) "union: in either")
(is (= ___ (set/intersection #{1 2} #{2 3})) "intersection: in both")
(is (= ___ (set/difference #{1 2} #{2 3})) "difference: in the first only")
(is (= ___ (set/subset? #{1} #{1 2})) "subset? asks")
(is (= ___ (set/select keyword? #{:a "b"})) "select keeps what passes")
