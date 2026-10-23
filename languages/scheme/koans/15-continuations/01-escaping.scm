;; title: Escaping
;; intro: `call/cc` passes the current continuation, "what happens next", to a procedure. Calling it jumps straight out, with the value given.
(test-equal "an escape is never needed here" ___ (call/cc (lambda (k) (+ 1 2))))
(test-equal "calling k jumps out with its value" ___ (call/cc (lambda (k) (+ 1 (k 10)))))
(test-equal "the rest of the expression still runs" ___ (+ 1 (call/cc (lambda (k) (k 10)))))
