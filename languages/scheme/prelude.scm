;; Run before every koan. The build drops these comment lines and joins the rest onto ONE line, so
;; error line numbers shift by exactly one; Scheme doesn't need newlines between forms.
;; Never put a ; comment at the end of a code line: the join would comment out the rest.
;;
;; SRFI 64's test-equal, test-eqv, test-eq, test-assert, test-error and test-group, as Scheme code is
;; tested: (test-equal "why" expected actual). Unlike SRFI 64's, they print TAP, so every blank is
;; checked: a failing test reports itself, with the learner's line as "# at web line N", and the
;; koan carries on.
;;
;; The worker (public/runtime/scheme/worker.js) rewrites the koan before it runs: each test call
;; gets its line and whether it holds a blank, (test-equal …) becoming (%test-equal line blank? …),
;; and each top-level form runs through %run or %value, which report an error the koan doesn't catch.
;; Stak has no standard error port, so diagnostics go to standard output, each line marked with
;; character 1 for the worker to move to standard error; an uncaught error, with character 2.

(import (scheme base) (scheme write) (scheme read) (scheme char) (scheme cxr) (scheme lazy) (scheme case-lambda) (srfi 1))

;; ___: a blank. A test that still holds one, anywhere in it, fails without running.
(define ___ '___)

(define %tests 0)
(define %groups '())
(define %stopped #f)

(define (%text value) (let ((port (open-output-string))) (write value port) (get-output-string port)))

;; Stak says only "procedure expected" when a name isn't defined, so say what that usually means.
(define (%message error)
  (if (error-object? error)
      (let ((message (error-object-message error)))
        (fold (lambda (irritant text) (string-append text " " (%text irritant)))
              (if (equal? message "procedure expected") "procedure expected: a name that isn't defined, or a call of something that isn't a procedure" message)
              (error-object-irritants error)))
      (%text error)))

(define (%marked mark text) (display (string (integer->char mark))) (display text) (newline))

(define (%describe name)
  (let loop ((parts (reverse (if (string? name) (cons name %groups) %groups))) (text ""))
    (cond ((null? parts) text)
          ((string=? text "") (loop (cdr parts) (car parts)))
          (else (loop (cdr parts) (string-append text " " (car parts)))))))

(define (%report ok name line diagnostics)
  (set! %tests (+ %tests 1))
  (let ((description (%describe name)))
    (display (if ok "ok " "not ok "))
    (display %tests)
    (if (not (string=? description "")) (begin (display " - ") (display description)))
    (newline))
  (if (not ok)
      (begin (for-each (lambda (d) (%marked 1 (string-append "# " d))) diagnostics)
             (%marked 1 (string-append "# at web line " (number->string line))))))

;; Runs thunk; if it raises, gives (on-error the-error) instead.
(define (%catching thunk on-error)
  (call-with-current-continuation
    (lambda (k) (with-exception-handler (lambda (e) (k (on-error e))) thunk))))

(define (%compare same? line blank name expected actual)
  (if blank
      (%report #f name line '())
      (%catching
        (lambda ()
          (let* ((e (expected)) (a (actual)))
            (%report (same? e a) name line
                     (list (string-append "expected: " (%text e)) (string-append "     got: " (%text a))))))
        (lambda (error) (%report #f name line (list (string-append "it raised: " (%message error))))))))

(define (%assert line blank name actual)
  (if blank
      (%report #f name line '())
      (%catching
        (lambda () (let ((a (actual))) (%report (not (eq? a #f)) name line (list (string-append "     got: " (%text a))))))
        (lambda (error) (%report #f name line (list (string-append "it raised: " (%message error))))))))

(define (%raises line blank name kind body)
  (if blank
      (%report #f name line '())
      (let ((raised (%catching (lambda () (body) #f) (lambda (error) (list error)))))
        (cond ((not raised) (%report #f name line '("expected an error, but none was raised")))
              ((or (eq? kind #t) (and (procedure? kind) (kind (car raised)))) (%report #t name line '()))
              (else (%report #f name line (list (string-append "it raised something else: " (%message (car raised))))))))))

(define-syntax %test-equal
  (syntax-rules ()
    ((_ line blank name expected actual) (%compare equal? line blank name (lambda () expected) (lambda () actual)))
    ((_ line blank expected actual) (%compare equal? line blank #f (lambda () expected) (lambda () actual)))))

(define-syntax %test-eqv
  (syntax-rules ()
    ((_ line blank name expected actual) (%compare eqv? line blank name (lambda () expected) (lambda () actual)))
    ((_ line blank expected actual) (%compare eqv? line blank #f (lambda () expected) (lambda () actual)))))

(define-syntax %test-eq
  (syntax-rules ()
    ((_ line blank name expected actual) (%compare eq? line blank name (lambda () expected) (lambda () actual)))
    ((_ line blank expected actual) (%compare eq? line blank #f (lambda () expected) (lambda () actual)))))

(define-syntax %test-assert
  (syntax-rules ()
    ((_ line blank name actual) (%assert line blank name (lambda () actual)))
    ((_ line blank actual) (%assert line blank #f (lambda () actual)))))

(define-syntax %test-error
  (syntax-rules ()
    ((_ line blank name kind body) (%raises line blank name kind (lambda () body)))
    ((_ line blank kind body) (%raises line blank #f kind (lambda () body)))
    ((_ line blank body) (%raises line blank #f #t (lambda () body)))))

(define-syntax %test-group
  (syntax-rules ()
    ((_ line blank name body ...)
     (dynamic-wind (lambda () (set! %groups (cons name %groups)))
                   (lambda () body ...)
                   (lambda () (set! %groups (cdr %groups)))))))

;; A top-level expression, and the value of a top-level define: an error the koan doesn't catch
;; stops the koan, as it would stop a Scheme program, and is reported with its line.
(define (%run line thunk)
  (if (not %stopped)
      (%catching thunk (lambda (error) (set! %stopped #t) (%marked 2 (string-append (number->string line) " " (%message error))) #f))))

(define (%value line thunk) (if %stopped #f (%run line thunk)))
