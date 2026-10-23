;; title: Thread-first and thread-last
;; intro: `->` passes a value as the first argument of each step, and `->>` as the last. They turn nested calls into a readable pipeline.
(is (= ___ (-> "hello" str/upper-case (str "!"))) "-> threads through the first argument")
(is (= ___ (->> [1 2 3 4] (filter even?) (map #(* % %)))) "->> threads through the last")
(is (= ___ (->> (range 5) (reduce +))) "into reduce")
(is (= ___ (-> {:a {:b 7}} :a :b)) "keywords work as steps")
(is (= ___ (macroexpand-1 '(-> x (f 1) g))) "-> just rewrites the code")
