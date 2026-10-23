module Ages = Map.Make (String)
let ages = Ages.empty |> Ages.add "Ada" 36 |> Ages.add "Alan" 41
let () = check (option int) "find_opt" (Some 36) (Ages.find_opt "Ada" ages)
let () = check (option int) "a missing key" None (Ages.find_opt "Grace" ages)
let () = check (list (pair string int)) "bindings, sorted by key" [("Ada", 36); ("Alan", 41)] (Ages.bindings ages)
let () = check int "cardinal" 2 (Ages.cardinal ages)
