(* title: Exceptions in match *)
(* intro: A `match` can catch an exception from the expression it matches, with an `exception` case, beside the cases for its values. *)
let lookup key table = match List.assoc key table with
  | value -> "found " ^ value
  | exception Not_found -> "missing"
let table = [("a", "apple"); ("b", "banana")]
let () = check string "a value" ___ (lookup "a" table)
let () = check string "the exception case" ___ (lookup "z" table)
let cleaned = ref false
let () = (try Fun.protect ~finally:(fun () -> cleaned := true) (fun () -> failwith "x") with Failure _ -> ())
let () = check bool "Fun.protect's finally runs even on an exception" ___ !cleaned
