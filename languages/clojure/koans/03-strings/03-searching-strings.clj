;; title: Searching and replacing
;; intro: `str/replace` replaces text, or every match of a pattern. `str/starts-with?` and `str/index-of` look inside a string.
(is (= ___ (str/replace "a-b-c" "-" "+")) "replace every occurrence")
(is (= ___ (str/replace "a1b2" #"\d" "#")) "or every match of a pattern")
(is (= ___ (str/starts-with? "koan" "ko")) "how a string begins")
(is (= ___ (str/index-of "banana" "n")) "where it first appears")
(is (= ___ (str/index-of "banana" "x")) "nil when it isn't there")
(is (= ___ (str/blank? "  ")) "blank? means only whitespace")
