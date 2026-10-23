(* title: Chaining results *)
(* intro: `Result.bind` runs the next step only if the previous one succeeded, so the first error is the one that comes out. `Result.map` changes an `Ok` value. *)
let positive n = if n > 0 then Ok n else Error "not positive"
let even n = if n mod 2 = 0 then Ok n else Error "not even"
let validate n = Result.bind (positive n) even
let () = check (result int string) "passes both" ___ (validate 4)
let () = check (result int string) "fails the first" ___ (validate (-2))
let () = check (result int string) "fails the second" ___ (validate 3)
let () = check (result int string) "Result.map" ___ (Result.map (fun n -> n * 10) (validate 4))
