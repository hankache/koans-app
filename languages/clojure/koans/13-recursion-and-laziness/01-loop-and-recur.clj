;; title: Loop and recur
;; intro: `loop` sets up names like `let`, and `recur` jumps back to it with new values, without using up the stack. Plain recursion works too, for shallow problems.
(defn sum-to [n] (loop [i 1 total 0] (if (> i n) total (recur (inc i) (+ total i)))))
(defn factorial [n] (if (<= n 1) 1 (* n (factorial (dec n)))))
(defn count-down [n] (if (zero? n) [:liftoff] (cons n (count-down (dec n)))))
(is (= ___ (sum-to 5)) "loop and recur")
(is (= ___ (sum-to 0)) "no rounds at all")
(is (= ___ (sum-to 10000)) "recur doesn't use up the stack")
(is (= ___ (factorial 5)) "plain recursion")
(is (= ___ (count-down 3)) "recursion building a sequence")
