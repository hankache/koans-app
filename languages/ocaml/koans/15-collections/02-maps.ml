(* title: Maps *)
(* intro: A map is immutable: adding or updating gives a new map. `update` changes one binding with a function of the old option. *)
module StringMap = Map.Make (String)
let count word m = StringMap.update word (function None -> Some 1 | Some n -> Some (n + 1)) m
let counts = List.fold_left (fun m w -> count w m) StringMap.empty ["a"; "b"; "a"]
let () = check (option int) "a counted twice" ___ (StringMap.find_opt "a" counts)
let () = check (list (pair string int)) "all the bindings" ___ (StringMap.bindings counts)
let () = check bool "the empty map is unchanged" ___ (StringMap.is_empty StringMap.empty)
