;; title: Dynamic-wind
;; intro: `dynamic-wind` runs a "before" and an "after" procedure around a body, and the "after" one runs even when an escape jumps out of it.
(define log '())
(define (note x) (set! log (cons x log)))
(dynamic-wind (lambda () (note 'before)) (lambda () (note 'during)) (lambda () (note 'after)))
(test-equal "in order" ___ (reverse log))
(set! log '())
(call/cc (lambda (k) (dynamic-wind (lambda () (note 'in)) (lambda () (k 'escaped) (note 'never)) (lambda () (note 'out)))))
(test-equal "after runs even on the way out" ___ (reverse log))
