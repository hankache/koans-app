(* title: Currying *)
(* intro: A function of two arguments is really a function of one that returns a function of the next: `add : int -> int -> int`. So giving it fewer arguments makes a new function. *)
let add a b = a + b
let add10 = add 10
let () = check int "add10 is add with its first argument fixed" ___ (add10 5)
let () = check (list int) "partial application with map" ___ (List.map (add 10) [1; 2])
let () = check (list int) "operators are functions too: ( * ) 2" ___ (List.map (( * ) 2) [1; 2; 3])
let () = check int "( + ) 1 2" ___ (( + ) 1 2)
