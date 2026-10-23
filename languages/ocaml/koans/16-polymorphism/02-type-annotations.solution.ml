let describe (n : int) : string = if n > 0 then "positive" else "not positive"
let empty_ints : int list = []
let () = check string "an annotated function" "positive" (describe 3)
let () = check int "an annotated empty list" 0 (List.length empty_ints)
let () = check (list int) "an annotation inside an expression" [1] ((1 :: []) : int list)
