;; title: Into and conversions
;; intro: `into` pours a sequence into a collection of your choice, `vec` and `set` convert, and `empty` gives an empty collection of the same kind.
(is (= ___ (vec '(1 2 3))) "vec makes a vector")
(is (= ___ (into #{} [1 2 2])) "into a set")
(is (= ___ (into '() [1 2 3])) "into a list adds each item to the front")
(is (= ___ (into {} [[:a 1]])) "pairs into a map")
(is (= ___ (vector? (vec (range 3)))) "vector?")
(is (= ___ (empty [1 2])) "empty keeps the kind")
