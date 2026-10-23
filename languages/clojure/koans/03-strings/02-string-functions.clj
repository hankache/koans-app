;; title: String functions
;; intro: `clojure.string`, here as `str/`, has the usual tools: case, trimming, splitting and joining.
(is (= ___ (str/upper-case "hello")) "upper case")
(is (= ___ (str/trim "  pad  ")) "trim removes the spaces around")
(is (= ___ (str/split "a,b,c" #",")) "split takes a regular expression")
(is (= ___ (str/join "-" ["x" "y" "z"])) "join puts a separator between")
(is (= ___ (str/includes? "hello" "ell")) "includes? looks inside")
(is (= ___ (str/capitalize "hello")) "capitalize")
