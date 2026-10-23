let lookup key table = match List.assoc key table with
  | value -> "found " ^ value
  | exception Not_found -> "missing"
let table = [("a", "apple"); ("b", "banana")]
let () = check string "a value" "found apple" (lookup "a" table)
let () = check string "the exception case" "missing" (lookup "z" table)
let cleaned = ref false
let () = (try Fun.protect ~finally:(fun () -> cleaned := true) (fun () -> failwith "x") with Failure _ -> ())
let () = check bool "Fun.protect's finally runs even on an exception" true !cleaned
