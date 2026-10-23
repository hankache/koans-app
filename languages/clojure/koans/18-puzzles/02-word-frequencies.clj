;; title: Word frequencies
;; intro: Counting how often each word appears takes one call to `frequencies`. Then the map answers questions.
(def text "the cat and the hat and the bat")
(def tally (frequencies (str/split text #" ")))
(is (= ___ (tally "the")) "how often \"the\" appears")
(is (= ___ (tally "dog")) "a word never seen isn't there")
(is (= ___ (count tally)) "how many different words")
(is (= ___ (apply max-key val tally)) "the most frequent")
(is (= ___ (reduce + (vals tally))) "and how many in all")
