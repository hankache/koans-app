let countdown n = Seq.unfold (fun k -> if k < 0 then None else Some (k, k - 1)) n
let fibs = Seq.unfold (fun (a, b) -> Some (a, (b, a + b))) (0, 1)
let () = check (list int) "a finite unfold" [3; 2; 1; 0] (List.of_seq (countdown 3))
let () = check (list int) "an infinite one" [0; 1; 1; 2; 3; 5; 8] (List.of_seq (Seq.take 7 fibs))
