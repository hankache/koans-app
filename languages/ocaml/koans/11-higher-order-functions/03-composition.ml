(* title: Composition *)
(* intro: Small functions combine into bigger ones. OCaml has no compose operator built in, but defining one takes a line. *)
let ( >> ) f g x = g (f x)
let inc x = x + 1
let double x = x * 2
let () = check int "inc, then double" ___ ((inc >> double) 3)
let () = check int "double, then inc" ___ ((double >> inc) 3)
let () = check (list string) "composed functions in a map" ___ (List.map (double >> string_of_int) [1; 2])
let () = check int "Fun.id gives back its argument" ___ (Fun.id 5)
