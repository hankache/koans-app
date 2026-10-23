;; title: Regular expressions
;; intro: `#"…"` is a regular expression. `re-find` finds the first match, `re-seq` all of them, and `re-matches` only matches the whole string. With groups, a match comes back as a vector.
(is (= ___ (re-find #"\d+" "abc42def")) "the first match")
(is (= ___ (re-seq #"\d+" "1 22 333")) "every match")
(is (= ___ (re-matches #"\d+" "12a")) "re-matches wants the whole string")
(is (= ___ (re-matches #"(\d+)-(\d+)" "12-34")) "the match, then its groups")
(is (= ___ (second (re-find #"(\d{4})-\d\d" "on 2024-05"))) "a group's text")
