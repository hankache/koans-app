let double = fun x -> x * 2
let () = check int "fun makes a function" 10 (double 5)
let () = check int "called right away" 9 ((fun x -> x * x) 3)
let () = check (list int) "passed to List.map" [2; 3; 4] (List.map (fun x -> x + 1) [1; 2; 3])
let () = check int "with two arguments" 12 ((fun a b -> a * b) 3 4)
