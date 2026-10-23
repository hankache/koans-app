;; title: Keywords and symbols
;; intro: Keywords like `:name` are values that stand for themselves, used as map keys and labels. Symbols like `inc` name things; quoting one with `'` keeps it as a symbol.
(is (= ___ (keyword "name")) "keyword makes a keyword")
(is (= ___ (name :name)) "name gives back its text")
(is (= ___ (:name {:name "Ada"})) "a keyword looks itself up in a map")
(is (= ___ (keyword? :a)) "keyword? asks")
(is (= ___ (symbol? 'inc)) "a quoted name is a symbol")
(is (= ___ (namespace :user/id)) "a keyword can have a namespace")
