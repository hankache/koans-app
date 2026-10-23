(* title: Defining exceptions *)
(* intro: `exception Name of type` defines a new exception, which can carry data like a constructor. *)
exception Out_of_stock of string
let buy item stock = if List.mem item stock then "bought " ^ item else raise (Out_of_stock item)
let () = check string "no exception" ___ (buy "tea" ["tea"; "jam"])
let () = check string "the exception's data" ___ (try buy "cake" ["tea"] with Out_of_stock item -> item)
let () = check_raises "check_raises compares the data too" ___ (fun () -> ignore (buy "cake" []))
