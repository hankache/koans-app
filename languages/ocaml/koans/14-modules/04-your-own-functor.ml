(* title: Your own functor *)
(* intro: A functor of your own takes a module that matches a signature. Any module with the right contents will do. *)
module type SHOWABLE = sig
  type t
  val show : t -> string
end
module Bracketed (S : SHOWABLE) = struct
  let show x = "[" ^ S.show x ^ "]"
  let show_all xs = String.concat " " (List.map show xs)
end
module Ints = Bracketed (struct type t = int let show = string_of_int end)
module Words = Bracketed (struct type t = string let show s = s end)
let () = check string "for ints" ___ (Ints.show_all [1; 2])
let () = check string "for strings" ___ (Words.show "hi")
