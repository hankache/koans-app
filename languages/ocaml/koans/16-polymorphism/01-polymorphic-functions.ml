(* title: Polymorphic functions *)
(* intro: A function that doesn't care about a type gets a type variable: `'a`. `List.length` has type `'a list -> int`, and works on lists of anything. *)
let first (x, _) = x
let duplicate x = [x; x]
let () = check int "first, on ints" ___ (first (1, "one"))
let () = check string "first, on strings" ___ (first ("a", 2))
let () = check (list string) "duplicate" ___ (duplicate "hi")
let () = check int "List.length doesn't look at the items" ___ (List.length [[1]; []])
