type counter = { mutable count : int }
let c = { count = 0 }
let () = c.count <- c.count + 1
let () = c.count <- c.count + 1
let () = check int "changed in place, twice" 2 c.count
