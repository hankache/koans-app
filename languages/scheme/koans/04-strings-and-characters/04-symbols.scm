;; title: Symbols
;; intro: A symbol is a name used as a value. Two symbols with the same name are the same object, so comparing them with `eq?` is quick.
(test-equal "symbol->string" ___ (symbol->string 'apple))
(test-equal "string->symbol" ___ (string->symbol "pear"))
(test-equal "the same name, the same symbol" ___ (eq? 'fig (string->symbol "fig")))
(test-equal "symbols in a list" ___ (list 'a 'b))
(test-equal "symbol=?" ___ (symbol=? 'kiwi 'kiwi))
