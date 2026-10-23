;; title: Memoize
;; intro: `memoize` remembers a function's results, so calling it again with the same arguments doesn't compute them again.
(def calls (atom 0))
(defn slow-square [x] (swap! calls inc) (* x x))
(def fast-square (memoize slow-square))
(fast-square 4)
(is (= ___ (fast-square 4)) "the same result")
(is (= ___ @calls) "computed only once")
(fast-square 5)
(is (= ___ @calls) "a new argument is computed")
