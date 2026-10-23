;; title: Characters
;; intro: A character is written `#\a`, or by name: `#\space`, `#\newline`. `string-ref` takes one out of a string, and `char-upcase`, `char-numeric?` and their cousins work on them.
(test-equal "string-ref" ___ (string-ref "abc" 1))
(test-equal "char-upcase" ___ (char-upcase #\a))
(test-equal "char-numeric?" ___ (char-numeric? #\7))
(test-equal "digit-value gives its number" ___ (digit-value #\7))
(test-equal "char->integer gives its code" ___ (char->integer #\A))
(test-equal "characters compare like numbers" ___ (char<? #\a #\b #\c))
