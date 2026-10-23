let encode s =
  let rec go acc = function
    | [] -> List.rev acc
    | c :: rest -> (match acc with
        | (n, d) :: acc' when d = c -> go ((n + 1, c) :: acc') rest
        | _ -> go ((1, c) :: acc) rest)
  in
  go [] (List.of_seq (String.to_seq s))
let decode pairs = String.concat "" (List.map (fun (n, c) -> String.make n c) pairs)
let () = check (list (pair int char)) "runs" [(3, 'a'); (1, 'b')] (encode "aaab")
let () = check string "and back" "xxyyy" (decode [(2, 'x'); (3, 'y')])
let () = check string "the round trip" "hello" (decode (encode "hello"))
