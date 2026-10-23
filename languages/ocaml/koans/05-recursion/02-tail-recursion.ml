(* title: Tail recursion *)
(* intro: A call that is the last thing a function does is a tail call, and it uses no stack. Carrying the result so far in an accumulator makes a recursion into a loop. *)
let rec sum_to n acc = if n = 0 then acc else sum_to (n - 1) (acc + n)
let count_down n =
  let rec go n steps = if n = 0 then steps else go (n - 1) (steps + 1) in
  go n 0
let () = check int "the accumulator holds the result so far" ___ (sum_to 5 0)
let () = check int "a million calls deep" ___ (count_down 1000000)
