;; title: Some and every
;; intro: `some` gives the first true result of a function, `every?` asks whether every item passes, and `not-any?` whether none does.
(is (= ___ (some even? [1 2 3])) "some finds one")
(is (= ___ (some even? [1 3])) "nil when nothing passes")
(is (= ___ (some #(when (> % 2) %) [1 3 5])) "some gives what the function gave")
(is (= ___ (every? pos? [1 2 3])) "every? asks about all")
(is (= ___ (every? pos? [])) "every? of nothing is true")
(is (= ___ (not-any? neg? [1 2])) "not-any?")
