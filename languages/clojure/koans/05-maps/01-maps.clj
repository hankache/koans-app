;; title: Maps
;; intro: A map, `{:name "Ada" :age 36}`, pairs keys with values. `get` looks one up, with a default if you give one; a keyword used as a function does the same.
(def ada {:name "Ada" :age 36})
(is (= ___ (get ada :name)) "get looks up a key")
(is (= ___ (:age ada)) "a keyword looks itself up")
(is (= ___ (get ada :email "?")) "a default for a missing key")
(is (= ___ (ada :name)) "a map is a function of its keys")
(is (= ___ (count ada)) "count counts the pairs")
(is (= ___ (contains? ada :age)) "contains? asks about a key")
