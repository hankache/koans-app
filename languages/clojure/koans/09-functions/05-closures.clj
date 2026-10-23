;; title: Closures
;; intro: A function made inside another keeps the values it saw there, even after the outer function has returned.
(defn adder [n] (fn [x] (+ x n)))
(def add5 (adder 5))
(is (= ___ (add5 3)) "add5 remembers its 5")
(is (= ___ (map (adder 10) [1 2])) "each adder has its own n")
(defn counter [] (let [n (atom 0)] (fn [] (swap! n inc))))
(def tick (counter))
(tick)
(is (= ___ (tick)) "the closure keeps its own atom")
(is (= ___ ((counter))) "and each counter has its own")
