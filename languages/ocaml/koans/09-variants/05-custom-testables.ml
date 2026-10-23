(* title: Checking your own types *)
(* intro: To check values of your own type, Alcotest needs to know how to print and compare them: `Alcotest.testable` takes a printer and an equality. *)
type suit = Hearts | Spades
let suit_name = function Hearts -> "Hearts" | Spades -> "Spades"
let suit = Alcotest.testable (fun ppf s -> Format.pp_print_string ppf (suit_name s)) ( = )
let flip = function Hearts -> Spades | Spades -> Hearts
let () = check suit "a check on your own type" ___ (flip Hearts)
let () = check (list suit) "testables combine" ___ (List.map flip [Hearts; Spades])
