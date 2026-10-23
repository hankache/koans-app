let ( >> ) f g x = g (f x)
let inc x = x + 1
let double x = x * 2
let () = check int "inc, then double" 8 ((inc >> double) 3)
let () = check int "double, then inc" 7 ((double >> inc) 3)
let () = check (list string) "composed functions in a map" ["2"; "4"] (List.map (double >> string_of_int) [1; 2])
let () = check int "Fun.id gives back its argument" 5 (Fun.id 5)
