(test-equal "an escape is never needed here" 3 (call/cc (lambda (k) (+ 1 2))))
(test-equal "calling k jumps out with its value" 10 (call/cc (lambda (k) (+ 1 (k 10)))))
(test-equal "the rest of the expression still runs" 11 (+ 1 (call/cc (lambda (k) (k 10)))))
