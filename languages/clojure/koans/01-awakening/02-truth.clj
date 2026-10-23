;; title: Truth
;; intro: Only `nil` and `false` are false in Clojure. Everything else, `0` and `""` included, is true.
(is (= ___ (if 0 :yes :no)) "zero is true")
(is (= ___ (if "" :yes :no)) "so is the empty string")
(is (= ___ (if nil :yes :no)) "nil is false")
(is (= ___ (boolean nil)) "boolean turns a value into true or false")
(is (= ___ (boolean [])) "an empty vector is true")
(is (= ___ (not false)) "not flips truth")
