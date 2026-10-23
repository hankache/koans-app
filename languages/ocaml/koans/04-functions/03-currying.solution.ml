let add a b = a + b
let add10 = add 10
let () = check int "add10 is add with its first argument fixed" 15 (add10 5)
let () = check (list int) "partial application with map" [11; 12] (List.map (add 10) [1; 2])
let () = check (list int) "operators are functions too: ( * ) 2" [2; 4; 6] (List.map (( * ) 2) [1; 2; 3])
let () = check int "( + ) 1 2" 3 (( + ) 1 2)
