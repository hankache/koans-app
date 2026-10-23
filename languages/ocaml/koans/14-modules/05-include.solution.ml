module Base = struct
  let greet name = "Hello, " ^ name
end
module Extended = struct
  include Base
  let shout name = String.uppercase_ascii (greet name)
end
let () = check string "included" "Hello, Ada" (Extended.greet "Ada")
let () = check string "added" "HELLO, ADA" (Extended.shout "Ada")
