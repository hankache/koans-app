(* title: Options *)
(* intro: OCaml has no null: a value that may be missing has type `'a option`, either `None` or `Some x`, and a match must handle both. *)
let safe_div a b = if b = 0 then None else Some (a / b)
let describe = function None -> "nothing" | Some n -> "got " ^ string_of_int n
let () = check (option int) "Some" ___ (safe_div 10 2)
let () = check (option int) "None" ___ (safe_div 1 0)
let () = check string "a match handles both" ___ (describe (safe_div 10 2))
let () = check string "the other one" ___ (describe None)
