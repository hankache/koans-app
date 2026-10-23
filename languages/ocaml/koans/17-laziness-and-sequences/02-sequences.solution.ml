let naturals = Seq.ints 0
let () = check (list int) "the first of an infinite sequence" [0; 1; 2] (naturals |> Seq.take 3 |> List.of_seq)
let () = check (list int) "map and filter, lazily" [0; 4; 16] (naturals |> Seq.filter (fun x -> x mod 2 = 0) |> Seq.map (fun x -> x * x) |> Seq.take 3 |> List.of_seq)
let () = check (list char) "a string as a sequence" ['o'; 'k'] (List.of_seq (String.to_seq "ok"))
