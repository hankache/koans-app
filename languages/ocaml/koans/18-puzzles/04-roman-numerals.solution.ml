let numerals = [(1000, "M"); (900, "CM"); (500, "D"); (400, "CD"); (100, "C"); (90, "XC"); (50, "L"); (40, "XL"); (10, "X"); (9, "IX"); (5, "V"); (4, "IV"); (1, "I")]
let rec roman n = match List.find_opt (fun (v, _) -> v <= n) numerals with
  | None -> ""
  | Some (v, letters) -> letters ^ roman (n - v)
let () = check string "one before five" "IV" (roman 4)
let () = check string "forty-two" "XLII" (roman 42)
let () = check string "1990" "MCMXC" (roman 1990)
