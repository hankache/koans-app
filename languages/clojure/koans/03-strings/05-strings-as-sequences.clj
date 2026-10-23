;; title: Strings as sequences
;; intro: A string is a sequence of characters, written `\a`: `reverse`, `set` and `frequencies` work on it, and `apply str` joins characters back into a string.
(is (= ___ (apply str (reverse "abc"))) "reverse gives characters; apply str joins them")
(is (= ___ (count (set "banana"))) "three different letters")
(is (= ___ (frequencies "banana")) "how often each appears")
(is (= ___ (= [\a \b] (seq "ab"))) "its items are characters")
(is (= ___ (str/join "-" (map str/upper-case "ban"))) "map works on strings too")
