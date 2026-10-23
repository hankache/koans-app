(* title: Arrays *)
(* intro: An array, `[| 1; 2; 3 |]`, has a fixed size and items that can change: `a.(i)` reads one and `a.(i) <- v` changes it. *)
let a = [| 10; 20; 30 |]
let () = check int "a.(i) counts from 0" ___ a.(1)
let () = a.(1) <- 99
let () = check (array int) "a.(i) <- v changes an item" ___ a
let () = check int "Array.length" ___ (Array.length a)
let () = check (array int) "Array.make" ___ (Array.make 2 0)
let () = check (array int) "Array.map makes a new array" ___ (Array.map (fun x -> x * x) [| 1; 2; 3 |])
