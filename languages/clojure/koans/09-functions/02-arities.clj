;; title: Arities and variadic functions
;; intro: A function can have several arities, one for each number of arguments, and `&` gathers the rest into a sequence. `apply` spreads a collection into arguments.
(defn greet
  ([] (greet "world"))
  ([name] (str "Hello, " name)))
(defn total [& numbers] (reduce + 0 numbers))
(is (= ___ (greet)) "no arguments")
(is (= ___ (greet "Ada")) "one argument")
(is (= ___ (total 1 2 3)) "& gathers the arguments")
(is (= ___ (total)) "even none at all")
(is (= ___ (apply total [1 2 3 4])) "apply spreads a collection into arguments")
