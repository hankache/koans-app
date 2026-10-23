let sum = ref 0
let () = for i = 1 to 4 do sum := !sum + i done
let () = check int "for counts up, both ends included" 10 !sum
let order = ref []
let () = for i = 3 downto 1 do order := i :: !order done
let () = check (list int) "downto" [1; 2; 3] !order
let n = ref 1
let () = while !n < 100 do n := !n * 3 done
let () = check int "while" 243 !n
