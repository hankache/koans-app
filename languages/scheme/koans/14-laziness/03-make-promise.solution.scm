(test-equal "a promise that is already kept" 5 (force (make-promise 5)))
(test-equal "delay-force: a promise for a promise" 6 (force (delay-force (delay (+ 1 5)))))
(test-equal "a promise made by make-promise is still a promise" #t (promise? (make-promise 7)))
