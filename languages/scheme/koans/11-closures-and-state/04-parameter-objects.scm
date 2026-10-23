;; title: Parameter objects
;; intro: `make-parameter` makes a value that `parameterize` changes for the time of its body only, and for every procedure called from it.
(define indent (make-parameter 2))
(define (spaces) (make-string (indent) #\space))
(test-equal "its value" ___ (indent))
(test-equal "changed inside parameterize" ___ (parameterize ((indent 4)) (spaces)))
(test-equal "and back afterward" ___ (spaces))
