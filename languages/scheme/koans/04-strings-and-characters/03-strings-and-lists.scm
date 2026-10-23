;; title: Strings and lists
;; intro: `string->list` turns a string into a list of characters, and `list->string` turns it back, so every list procedure can work on text.
(test-equal "string->list" ___ (string->list "hi"))
(test-equal "list->string" ___ (list->string (list #\o #\k)))
(test-equal "reversing a string" ___ (list->string (reverse (string->list "abc"))))
(test-equal "string makes a string of characters" ___ (string #\a #\b))
(test-equal "string-map applies to every character" ___ (string-map char-upcase "abc"))
