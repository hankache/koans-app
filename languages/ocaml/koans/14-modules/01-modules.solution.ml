module Geometry = struct
  let pi = 3
  let circle_area r = pi * r * r
end
let () = check int "reached with a dot" 12 (Geometry.circle_area 2)
let () = check int "a local open" 3 Geometry.(pi)
let () = check int "let open … in" 27 (let open Geometry in circle_area pi)
