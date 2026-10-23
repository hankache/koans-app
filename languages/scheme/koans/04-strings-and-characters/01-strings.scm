;; title: Strings
;; intro: `string-append` joins strings, `substring` cuts one, from an index to just before another, and `string-length` measures it.
(test-equal "string-append" ___ (string-append "Hello" ", " "world"))
(test-equal "string-length" ___ (string-length "hello"))
(test-equal "substring stops before its end" ___ (substring "hello" 1 4))
(test-equal "string-upcase" ___ (string-upcase "loud"))
(test-equal "string=? compares" ___ (string=? "abc" "abc"))
(test-equal "string<? compares alphabetically" ___ (string<? "apple" "banana"))
