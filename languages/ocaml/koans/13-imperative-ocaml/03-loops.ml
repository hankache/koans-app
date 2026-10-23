(* title: Loops *)
(* intro: `for i = a to b do … done` counts up, `downto` counts down, and `while … do … done` loops while a condition holds. `;` puts one expression after another. *)
let sum = ref 0
let () = for i = 1 to 4 do sum := !sum + i done
let () = check int "for counts up, both ends included" ___ !sum
let order = ref []
let () = for i = 3 downto 1 do order := i :: !order done
let () = check (list int) "downto" ___ !order
let n = ref 1
let () = while !n < 100 do n := !n * 3 done
let () = check int "while" ___ !n
