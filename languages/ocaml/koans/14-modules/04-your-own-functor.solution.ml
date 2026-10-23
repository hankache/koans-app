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
let () = check string "for ints" "[1] [2]" (Ints.show_all [1; 2])
let () = check string "for strings" "[hi]" (Words.show "hi")
