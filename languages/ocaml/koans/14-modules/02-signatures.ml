(* title: Signatures *)
(* intro: A signature, `sig … end`, lists what a module shows. Giving a module a signature hides the rest, and an abstract type hides how a type is made, so only the module's own functions can build or read it. *)
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
let () = check int "only through the module's functions" ___ Counter.(to_int (incr (incr zero)))
