;; title: Keys and values
;; intro: `keys` and `vals` list a map's parts, `select-keys` keeps some of them, and `zipmap` builds a map from two sequences. A map is also a sequence of pairs.
(is (= ___ (set (keys {:a 1 :b 2}))) "keys, in no promised order")
(is (= ___ (reduce + (vals {:a 1 :b 2 :c 3}))) "vals")
(is (= ___ (select-keys {:a 1 :b 2} [:a])) "select-keys keeps some")
(is (= ___ (zipmap [:a :b] [1 2])) "zipmap pairs keys with values")
(is (= ___ (seq {:a 1 :b 2})) "a map is a sequence of pairs")
