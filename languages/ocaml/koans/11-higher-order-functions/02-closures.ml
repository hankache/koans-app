(* title: Closures *)
(* intro: A function made inside another keeps the values it could see there, even after the outer function has returned. *)
let make_adder n = fun x -> x + n
let add5 = make_adder 5
let () = check int "add5 remembers its 5" ___ (add5 3)
let () = check (list int) "each adder has its own n" ___ (List.map (make_adder 10) [1; 2])
let make_counter () =
  let count = ref 0 in
  fun () -> incr count; !count
let tick = make_counter ()
let _ = tick ()
let () = check int "the closure keeps its own state" ___ (tick ())
let () = check int "a new counter starts again" ___ (make_counter () ())
