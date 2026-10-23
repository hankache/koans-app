let () = check_raises "dividing by zero" Division_by_zero (fun () -> ignore (1 / 0))
let () = check_raises "List.nth past the end" (Failure "nth") (fun () -> ignore (List.nth [1] 5))
let () = check_raises "String.sub out of range" (Invalid_argument "String.sub / Bytes.sub") (fun () -> ignore (String.sub "abc" 2 5))
let () = check (option int) "the _opt twin" None (List.nth_opt [1] 5)
