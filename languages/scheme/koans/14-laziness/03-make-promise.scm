;; title: Ready-made promises
;; intro: `make-promise` wraps a value that is already known, and `delay-force` delays an expression that itself gives a promise.
(test-equal "a promise that is already kept" ___ (force (make-promise 5)))
(test-equal "delay-force: a promise for a promise" ___ (force (delay-force (delay (+ 1 5)))))
(test-equal "a promise made by make-promise is still a promise" ___ (promise? (make-promise 7)))
