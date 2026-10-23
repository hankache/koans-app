(* title: Unfolding *)
(* intro: `Seq.unfold` builds a sequence from a state: each step gives the next item and the next state, or `None` to stop. *)
let countdown n = Seq.unfold (fun k -> if k < 0 then None else Some (k, k - 1)) n
let fibs = Seq.unfold (fun (a, b) -> Some (a, (b, a + b))) (0, 1)
let () = check (list int) "a finite unfold" ___ (List.of_seq (countdown 3))
let () = check (list int) "an infinite one" ___ (List.of_seq (Seq.take 7 fibs))
