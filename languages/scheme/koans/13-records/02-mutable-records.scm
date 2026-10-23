;; title: Changing records
;; intro: A field can also get a modifier, which changes it in place. Fields without one can't be changed.
(define-record-type account
  (make-account owner balance)
  account?
  (owner account-owner)
  (balance account-balance set-account-balance!))
(define acc (make-account "Ada" 100))
(set-account-balance! acc 150)
(test-equal "the changed field" ___ (account-balance acc))
(test-equal "the other field is as it was" ___ (account-owner acc))
