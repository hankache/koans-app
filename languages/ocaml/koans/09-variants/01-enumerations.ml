(* title: Enumerations *)
(* intro: A variant type lists its cases, its constructors, each starting with a capital letter. A match on it must handle every case: the compiler warns about a missing one. *)
type color = Red | Green | Blue
let to_string = function Red -> "red" | Green -> "green" | Blue -> "blue"
let next = function Red -> Green | Green -> Blue | Blue -> Red
let () = check string "a match on a variant" ___ (to_string Green)
let () = check string "from one case to the next" ___ (to_string (next Green))
let () = check bool "constructors compare" ___ (next Blue = Red)
