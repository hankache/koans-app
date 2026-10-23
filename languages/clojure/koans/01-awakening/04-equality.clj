;; title: Equality
;; intro: `=` compares values, not identity: two vectors with the same items are equal, and so are a vector and a list. `identical?` asks whether two things are the very same object.
(is (= ___ (= [1 2] [1 2])) "same contents, equal")
(is (= ___ (= [1 2] '(1 2))) "a vector and a list with the same items are equal")
(is (= ___ (= [1 2] #{1 2})) "but a set isn't a sequence")
(is (= ___ (= {:a 1 :b 2} {:b 2 :a 1})) "map order doesn't matter")
(is (= ___ (identical? [1] [1])) "two vectors, not the same object")
(is (= ___ (not= 1 2)) "not= is the opposite")
