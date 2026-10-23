module type COUNTER = sig
  type t
  val zero : t
  val incr : t -> t
  val to_int : t -> int
end
module Counter : COUNTER = struct
  type t = int
  let zero = 0
  let incr n = n + 1
  let to_int n = n
end
let () = check int "only through the module's functions" 2 Counter.(to_int (incr (incr zero)))
