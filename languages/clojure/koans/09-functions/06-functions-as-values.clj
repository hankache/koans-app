;; title: Functions as values
;; intro: Functions are values like any other: they can be passed in, returned, and kept in collections.
(defn twice [f x] (f (f x)))
(def ops {:add + :mul *})
(is (= ___ (twice #(* 2 %) 3)) "a function passed in")
(is (= ___ (map #(% 1) [inc dec])) "a vector of functions")
(is (= ___ ((:mul ops) 3 4)) "a function from a map")
(is (= ___ ((fnil + 0) nil 6)) "fnil replaces a nil argument")
