;; title: Comparison
;; intro: `<` and its friends take several arguments and check that they are in order. `compare` gives -1, 0 or 1.
(is (= ___ (< 1 2 3)) "in increasing order")
(is (= ___ (< 1 3 2)) "every neighboring pair must hold")
(is (= ___ (<= 1 1 2)) "<= allows equal neighbors")
(is (= ___ (max 3 7 5)) "max")
(is (= ___ (min 3 7 5)) "min")
(is (= ___ (compare 1 2)) "compare gives -1 when the first is smaller")
