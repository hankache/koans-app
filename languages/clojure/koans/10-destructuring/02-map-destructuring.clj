;; title: Taking maps apart
;; intro: A map pattern takes values by key: `{:keys [a b]}` names them after their keys, `:or` gives defaults, and `:as` keeps the whole map.
(def person {:name "Ada" :born 1815})
(let [{:keys [name born]} person] (is (= ___ born) ":keys names values after their keys"))
(let [{n :name} person] (is (= ___ n) "or give a key a name of your own"))
(let [{:keys [email] :or {email "none"}} person] (is (= ___ email) ":or gives a default"))
(let [{:keys [name] :as all} person] (is (= ___ (count all)) ":as keeps the map"))
(let [{{:keys [city]} :address} {:address {:city "London"}}] (is (= ___ city) "patterns nest"))
