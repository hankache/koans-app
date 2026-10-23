(* title: Sequences *)
(* intro: A `Seq.t` is a lazy sequence: its items are computed as they're read, so it can even be infinite. `Seq.take` stops it. *)
let naturals = Seq.ints 0
let () = check (list int) "the first of an infinite sequence" ___ (naturals |> Seq.take 3 |> List.of_seq)
let () = check (list int) "map and filter, lazily" ___ (naturals |> Seq.filter (fun x -> x mod 2 = 0) |> Seq.map (fun x -> x * x) |> Seq.take 3 |> List.of_seq)
let () = check (list char) "a string as a sequence" ___ (List.of_seq (String.to_seq "ok"))
