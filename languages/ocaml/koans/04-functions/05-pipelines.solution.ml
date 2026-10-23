let () = check int "|> passes the value on" 6 (3 |> fun x -> x * 2)
let () = check int "a pipeline" 10 ([1; 2; 3; 4] |> List.map (fun x -> x * x) |> List.filter (fun x -> x mod 2 = 0) |> List.fold_left ( + ) 0 |> fun x -> x / 2)
let () = check string "@@ saves parentheses" "7" (string_of_int @@ 3 + 4)
