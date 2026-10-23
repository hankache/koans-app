(* title: Type annotations *)
(* intro: Types are inferred, but you can write them, to document or to restrict: `(x : int)`, or `let f (x : int) : string = …`. *)
let describe (n : int) : string = if n > 0 then "positive" else "not positive"
let empty_ints : int list = []
let () = check string "an annotated function" ___ (describe 3)
let () = check int "an annotated empty list" ___ (List.length empty_ints)
let () = check (list int) "an annotation inside an expression" ___ ((1 :: []) : int list)
