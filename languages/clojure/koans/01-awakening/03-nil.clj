;; title: Nil
;; intro: `nil` means nothing at all. Most functions accept it gracefully, as an empty collection or a missing value.
(is (= ___ (get {:a 1} :b)) "a missing key gives nil")
(is (= ___ (first [])) "so does the first of nothing")
(is (= ___ (count nil)) "nil counts as empty")
(is (= ___ (conj nil 1)) "conj onto nil makes a list")
(is (= ___ (nil? nil)) "nil? asks")
(is (= ___ (or nil "none")) "or gives the first true value")
