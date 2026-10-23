;; title: Defmacro
;; intro: A macro is a function that runs before the code does: it receives code and returns code, which then runs in its place.
(defmacro unless [test & body] `(if ~test nil (do ~@body)))
(defmacro twice [form] `(do ~form ~form))
(is (= ___ (unless false :ran)) "unless runs its body when the test is false")
(is (= ___ (unless true :ran)) "and not when it's true")
(is (= ___ (macroexpand-1 '(unless c x))) "what it turns into")
(def hits (atom 0))
(twice (swap! hits inc))
(is (= ___ @hits) "the form runs twice: a function would get its value once")
