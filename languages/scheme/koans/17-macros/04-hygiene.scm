;; title: Hygiene
;; intro: `syntax-rules` macros are hygienic: a name the macro introduces, like `t` in `my-or`, can't clash with the same name in your code.
(define-syntax my-or
  (syntax-rules ()
    ((_ a b) (let ((t a)) (if t t b)))))
(define t 5)
(test-equal "the macro's t doesn't hide yours" ___ (my-or #f t))
(define-syntax while
  (syntax-rules ()
    ((_ test body ...) (let loop () (when test body ... (loop))))))
(define i 0)
(define total 0)
(while (< i 4) (set! total (+ total i)) (set! i (+ i 1)))
(test-equal "a loop of your own" ___ total)
