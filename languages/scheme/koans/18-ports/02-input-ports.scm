;; title: Input ports
;; intro: An input port gives text back a piece at a time: `read-char` a character, `read-line` a line, and `read` a whole Scheme value. At the end, they give an end-of-file object.
(define port (open-input-string "hello world\nsecond line"))
(test-equal "read-char" ___ (read-char port))
(test-equal "read-line reads the rest of the line" ___ (read-line port))
(test-equal "then the next line" ___ (read-line port))
(test-equal "the end of the text" ___ (eof-object? (read-char port)))
(test-equal "read gives Scheme data" ___ (read (open-input-string "(1 (2 three)) more")))
