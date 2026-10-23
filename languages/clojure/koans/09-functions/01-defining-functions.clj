;; title: Defining functions
;; intro: `defn` defines a named function: a name, a vector of parameters, then a body whose last value is the result.
(defn square [x] (* x x))
(defn greet [name] (str "Hello, " name "!"))
(is (= ___ (square 5)) "a function returns its last value")
(is (= ___ (greet "Ada")) "another")
(is (= ___ (fn? square)) "a function is a value")
(is (= ___ (map square [1 2 3])) "and can be passed around")
