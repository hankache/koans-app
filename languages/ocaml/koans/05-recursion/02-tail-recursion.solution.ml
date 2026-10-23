let rec sum_to n acc = if n = 0 then acc else sum_to (n - 1) (acc + n)
let count_down n =
  let rec go n steps = if n = 0 then steps else go (n - 1) (steps + 1) in
  go n 0
let () = check int "the accumulator holds the result so far" 15 (sum_to 5 0)
let () = check int "a million calls deep" 1000000 (count_down 1000000)
