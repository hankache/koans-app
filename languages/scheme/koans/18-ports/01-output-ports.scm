;; title: Output ports
;; intro: `display` and `write` print to a port. `write` prints a value the way you'd type it in code; `display` prints text as it is. A string port collects what is printed into a string.
(define (to-string print value) (let ((port (open-output-string))) (print value port) (get-output-string port)))
(test-equal "display prints the text" ___ (to-string display "hi"))
(test-equal "write prints it as code, with quotes" ___ (to-string write "hi"))
(test-equal "a list, written" ___ (to-string write (list 1 "a" #\b)))
(test-equal "displayed" ___ (to-string display (list 1 "a" #\b)))
