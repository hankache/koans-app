exception Out_of_stock of string
let buy item stock = if List.mem item stock then "bought " ^ item else raise (Out_of_stock item)
let () = check string "no exception" "bought tea" (buy "tea" ["tea"; "jam"])
let () = check string "the exception's data" "cake" (try buy "cake" ["tea"] with Out_of_stock item -> item)
let () = check_raises "check_raises compares the data too" (Out_of_stock "cake") (fun () -> ignore (buy "cake" []))
