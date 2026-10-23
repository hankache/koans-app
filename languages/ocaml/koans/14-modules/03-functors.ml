(* title: Functors *)
(* intro: A functor is a function from modules to modules. `Map.Make` takes a module with a type and a `compare`, and gives a module of maps with those keys. *)
module Ages = Map.Make (String)
let ages = Ages.empty |> Ages.add "Ada" 36 |> Ages.add "Alan" 41
let () = check (option int) "find_opt" ___ (Ages.find_opt "Ada" ages)
let () = check (option int) "a missing key" ___ (Ages.find_opt "Grace" ages)
let () = check (list (pair string int)) "bindings, sorted by key" ___ (Ages.bindings ages)
let () = check int "cardinal" ___ (Ages.cardinal ages)
