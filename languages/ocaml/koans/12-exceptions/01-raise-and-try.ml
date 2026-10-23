(* title: Raise and try *)
(* intro: `raise` throws an exception, and `try … with` handles it by pattern matching. `failwith "msg"` raises `Failure "msg"`. *)
let safe_hd l = try List.hd l with Failure _ -> -1
let () = check int "no exception" ___ (safe_hd [1; 2])
let () = check int "the exception is handled" ___ (safe_hd [])
let () = check string "the handler sees the message" ___ (try failwith "boom" with Failure msg -> msg)
let () = check_raises "check_raises wants the exact exception" ___ (fun () -> List.find (fun x -> x > 5) [1; 2])
