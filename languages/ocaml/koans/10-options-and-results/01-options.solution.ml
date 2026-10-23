let safe_div a b = if b = 0 then None else Some (a / b)
let describe = function None -> "nothing" | Some n -> "got " ^ string_of_int n
let () = check (option int) "Some" (Some 5) (safe_div 10 2)
let () = check (option int) "None" None (safe_div 1 0)
let () = check string "a match handles both" "got 5" (describe (safe_div 10 2))
let () = check string "the other one" "nothing" (describe None)
