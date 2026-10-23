(test-equal "apply spreads a list into arguments" 10 (apply + '(1 2 3 4)))
(test-equal "extra arguments come first" 10 (apply + 1 2 '(3 4)))
(test-equal "the largest of a list" 9 (apply max '(3 9 4)))
(test-equal "joining a list of strings" "abc" (apply string-append '("a" "b" "c")))
