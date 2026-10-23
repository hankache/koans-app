let total = ref 0
let () = List.iter (fun x -> total := !total + x) [1; 2; 3]
let () = check int "List.iter, for an effect" 6 !total
let seen = ref []
let () = List.iteri (fun i s -> seen := Printf.sprintf "%d:%s" i s :: !seen) ["a"; "b"]
let () = check (list string) "iteri passes the index" ["1:b"; "0:a"] !seen
let () = check unit "unit has one value" () (List.iter ignore [1; 2])
