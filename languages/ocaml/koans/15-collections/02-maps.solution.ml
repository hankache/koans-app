module StringMap = Map.Make (String)
let count word m = StringMap.update word (function None -> Some 1 | Some n -> Some (n + 1)) m
let counts = List.fold_left (fun m w -> count w m) StringMap.empty ["a"; "b"; "a"]
let () = check (option int) "a counted twice" (Some 2) (StringMap.find_opt "a" counts)
let () = check (list (pair string int)) "all the bindings" [("a", 2); ("b", 1)] (StringMap.bindings counts)
let () = check bool "the empty map is unchanged" true (StringMap.is_empty StringMap.empty)
