(define-record-type account
  (make-account owner balance)
  account?
  (owner account-owner)
  (balance account-balance set-account-balance!))
(define acc (make-account "Ada" 100))
(set-account-balance! acc 150)
(test-equal "the changed field" 150 (account-balance acc))
(test-equal "the other field is as it was" "Ada" (account-owner acc))
