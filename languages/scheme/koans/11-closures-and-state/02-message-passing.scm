;; title: Message passing
;; intro: A closure can answer messages, a classic Scheme way to build an object: here a bank account, whose balance nothing else can reach.
(define (make-account balance)
  (lambda (message amount)
    (case message
      ((deposit) (set! balance (+ balance amount)) balance)
      ((withdraw) (if (> amount balance) 'insufficient (begin (set! balance (- balance amount)) balance)))
      (else 'unknown))))
(define acc (make-account 100))
(test-equal "deposit" ___ (acc 'deposit 50))
(test-equal "withdraw" ___ (acc 'withdraw 30))
(test-equal "too much" ___ (acc 'withdraw 500))
(test-equal "the balance is unchanged" ___ (acc 'deposit 0))
