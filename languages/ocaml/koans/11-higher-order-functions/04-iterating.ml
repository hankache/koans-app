(* title: Iterating for effects *)
(* intro: `List.iter` runs a function on every item for its effect, and returns `()`, the only value of type `unit`. *)
let total = ref 0
let () = List.iter (fun x -> total := !total + x) [1; 2; 3]
let () = check int "List.iter, for an effect" ___ !total
let seen = ref []
let () = List.iteri (fun i s -> seen := Printf.sprintf "%d:%s" i s :: !seen) ["a"; "b"]
let () = check (list string) "iteri passes the index" ___ !seen
let () = check unit "unit has one value" ___ (List.iter ignore [1; 2])
