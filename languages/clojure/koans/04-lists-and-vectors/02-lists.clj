;; title: Lists
;; intro: A list, `'(1 2 3)`, is a chain built from the front: `conj` adds there, and `first` and `rest` take it apart. The quote stops the list from being run as a call.
(is (= ___ (conj '(1 2) 0)) "conj adds to the front")
(is (= ___ (first '(1 2 3))) "first")
(is (= ___ (rest '(1 2 3))) "rest is everything after the first")
(is (= ___ (peek '(1 2 3))) "peek looks at a list's front")
(is (= ___ (peek [1 2 3])) "but at a vector's end")
(is (= ___ (list? '(1))) "list? asks")
