let safe_hd l = try List.hd l with Failure _ -> -1
let () = check int "no exception" 1 (safe_hd [1; 2])
let () = check int "the exception is handled" (-1) (safe_hd [])
let () = check string "the handler sees the message" "boom" (try failwith "boom" with Failure msg -> msg)
let () = check_raises "check_raises wants the exact exception" Not_found (fun () -> List.find (fun x -> x > 5) [1; 2])
