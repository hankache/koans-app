let () = check (option int) "map on Some" (Some 6) (Option.map (fun x -> x * 2) (Some 3))
let () = check (option int) "map on None" None (Option.map (fun x -> x * 2) None)
let () = check int "value gives a default" 0 (Option.value ~default:0 None)
let half n = if n mod 2 = 0 then Some (n / 2) else None
let () = check (option int) "bind chains steps" (Some 2) (Option.bind (Some 8) half |> fun o -> Option.bind o half)
let () = check (option int) "one failing step fails it all" None (Option.bind (Some 6) half |> fun o -> Option.bind o half)
