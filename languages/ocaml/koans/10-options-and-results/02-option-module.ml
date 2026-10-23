(* title: The Option module *)
(* intro: `Option.map` changes what's inside a `Some`, `Option.value` gives a default for `None`, and `Option.bind` chains steps that may each fail. *)
let () = check (option int) "map on Some" ___ (Option.map (fun x -> x * 2) (Some 3))
let () = check (option int) "map on None" ___ (Option.map (fun x -> x * 2) None)
let () = check int "value gives a default" ___ (Option.value ~default:0 None)
let half n = if n mod 2 = 0 then Some (n / 2) else None
let () = check (option int) "bind chains steps" ___ (Option.bind (Some 8) half |> fun o -> Option.bind o half)
let () = check (option int) "one failing step fails it all" ___ (Option.bind (Some 6) half |> fun o -> Option.bind o half)
