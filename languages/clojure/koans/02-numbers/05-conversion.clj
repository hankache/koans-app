;; title: Conversion
;; intro: `parse-long` reads a whole number from text and gives `nil` if it can't; `str` turns anything into text, and `int` drops a fraction.
(is (= ___ (parse-long "42")) "parse-long reads a whole number")
(is (= ___ (parse-long "forty")) "and gives nil for anything else")
(is (= ___ (str 42)) "str makes text")
(is (= ___ (int 3.9)) "int drops the fraction")
(is (= ___ (number? 1.5)) "number? asks")
(is (= ___ (number? "1")) "text is not a number")
