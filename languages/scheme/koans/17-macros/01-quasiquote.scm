;; title: Quasiquote
;; intro: A quasiquote, `` ` ``, builds a list from a template: `,` puts a value in, and `,@` splices a list in.
(define n 5)
(test-equal ", puts a value in" ___ `(a ,n))
(test-equal "without it, the symbol stays" ___ `(a n))
(test-equal ",@ splices a list in" ___ `(1 ,@(list 2 3) 4))
(test-equal "any expression can go after `,`" ___ `(sum ,(+ 3 4)))
