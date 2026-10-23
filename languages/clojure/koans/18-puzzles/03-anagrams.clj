;; title: Anagrams
;; intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share.
(def words ["listen" "silent" "enlist" "google" "cat" "act"])
(def groups (group-by #(apply str (sort %)) words))
(is (= ___ (groups "eilnst")) "sorted letters are the key")
(is (= ___ (count groups)) "how many groups")
(is (= ___ (groups "act")) "each group keeps the original order")
(is (= ___ (= (sort "dusty") (sort "study"))) "a quick anagram test")
