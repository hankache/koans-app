let a = [| 10; 20; 30 |]
let () = check int "a.(i) counts from 0" 20 a.(1)
let () = a.(1) <- 99
let () = check (array int) "a.(i) <- v changes an item" [| 10; 99; 30 |] a
let () = check int "Array.length" 3 (Array.length a)
let () = check (array int) "Array.make" [| 0; 0 |] (Array.make 2 0)
let () = check (array int) "Array.map makes a new array" [| 1; 4; 9 |] (Array.map (fun x -> x * x) [| 1; 2; 3 |])
