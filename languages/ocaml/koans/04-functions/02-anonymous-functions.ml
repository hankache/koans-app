(* title: Anonymous functions *)
(* intro: `fun x -> x + 1` is a function without a name. `let f x = …` is a shorter way to write `let f = fun x -> …`. *)
let double = fun x -> x * 2
let () = check int "fun makes a function" ___ (double 5)
let () = check int "called right away" ___ ((fun x -> x * x) 3)
let () = check (list int) "passed to List.map" ___ (List.map (fun x -> x + 1) [1; 2; 3])
let () = check int "with two arguments" ___ ((fun a b -> a * b) 3 4)
