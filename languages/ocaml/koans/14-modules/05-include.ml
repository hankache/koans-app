(* title: Include *)
(* intro: `include` copies a module's contents into another, which can then add to them. *)
module Base = struct
  let greet name = "Hello, " ^ name
end
module Extended = struct
  include Base
  let shout name = String.uppercase_ascii (greet name)
end
let () = check string "included" ___ (Extended.greet "Ada")
let () = check string "added" ___ (Extended.shout "Ada")
