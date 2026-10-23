;; title: Compare-and-set and watches
;; intro: `compare-and-set!` changes an atom only if it still holds the value you expect. `add-watch` runs a function on every change, with the old and new values.
(def a (atom 0))
(is (= ___ (compare-and-set! a 0 5)) "it held 0, so it changes")
(is (= ___ (compare-and-set! a 0 9)) "it holds 5 now, not 0")
(is (= ___ @a) "so it's still 5")
(def log (atom []))
(add-watch a :log (fn [_ _ old new] (swap! log conj [old new])))
(swap! a inc)
(is (= ___ @log) "the watch saw the old and the new value")
