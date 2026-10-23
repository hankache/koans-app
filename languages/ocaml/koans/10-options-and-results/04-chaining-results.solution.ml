let positive n = if n > 0 then Ok n else Error "not positive"
let even n = if n mod 2 = 0 then Ok n else Error "not even"
let validate n = Result.bind (positive n) even
let () = check (result int string) "passes both" (Ok 4) (validate 4)
let () = check (result int string) "fails the first" (Error "not positive") (validate (-2))
let () = check (result int string) "fails the second" (Error "not even") (validate 3)
let () = check (result int string) "Result.map" (Ok 40) (Result.map (fun n -> n * 10) (validate 4))
