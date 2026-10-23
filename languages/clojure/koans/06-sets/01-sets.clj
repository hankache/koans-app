;; title: Sets
;; intro: A set, `#{1 2 3}`, holds each value once. `conj` and `disj` add and remove, and a set used as a function answers whether it holds a value.
(is (= ___ (conj #{1 2} 3)) "conj adds a value")
(is (= ___ (conj #{1 2} 2)) "a value already there changes nothing")
(is (= ___ (disj #{1 2} 2)) "disj removes one")
(is (= ___ (#{1 2 3} 2)) "a set gives back the value it holds")
(is (= ___ (#{1 2 3} 4)) "or nil")
(is (= ___ (count (set [1 1 2 3 3]))) "set drops the duplicates")
