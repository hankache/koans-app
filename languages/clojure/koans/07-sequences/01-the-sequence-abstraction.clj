;; title: The sequence abstraction
;; intro: Every collection can be seen as a sequence: `first`, `rest` and `cons` work on vectors, lists, sets, maps and strings alike, and `seq` gives `nil` for an empty one.
(is (= ___ (first [1 2 3])) "first")
(is (= ___ (rest [1 2 3])) "rest gives a sequence")
(is (= ___ (cons 0 [1 2])) "cons puts an item in front")
(is (= ___ (seq [])) "the seq of an empty collection is nil")
(is (= ___ (rest [1])) "the rest of one item is empty, not nil")
(is (= ___ (next [1])) "next is like rest, but gives nil")
