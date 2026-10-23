(defn greet
  ([] (greet "world"))
  ([name] (str "Hello, " name)))
(defn total [& numbers] (reduce + 0 numbers))
(is (= "Hello, world" (greet)) "no arguments")
(is (= "Hello, Ada" (greet "Ada")) "one argument")
(is (= 6 (total 1 2 3)) "& gathers the arguments")
(is (= 0 (total)) "even none at all")
(is (= 10 (apply total [1 2 3 4])) "apply spreads a collection into arguments")
