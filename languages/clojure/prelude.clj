;; Run before every koan. The build drops these comment lines and joins the rest onto ONE line, so
;; error line numbers shift by exactly one; Clojure doesn't need newlines between forms.
;; Never put a ; comment at the end of a code line: the join would comment out the rest.
;;
;; clojure.test's is, testing and deftest, as Clojure code is tested: (is (= expected actual) "why").
;; Unlike clojure.test, they print TAP, so every blank is checked: a failing assertion reports
;; itself, with the learner's line as "# at web line N", and the koan carries on.

(ns koans.test (:require [clojure.string :as str]))

;; ___: a blank. An assertion that still holds one, anywhere in it, fails without running.
(def ___ (symbol "___"))

(def tests (atom 0))
(def ^:dynamic *contexts* [])

(defn blank-in? [form] (boolean (some #{'___} (tree-seq coll? seq form))))

(defn describe [message] (str/join " " (remove nil? (conj *contexts* message))))

(defn report [ok message line diag]
  (let [n (swap! tests inc)]
    (println (str (if ok "ok " "not ok ") n (when (seq message) (str " - " message))))
    (when-not ok
      (doseq [d diag] (.error js/console (str "# " d)))
      (.error js/console (str "# at web line " line)))
    ok))

(defn compare-values [expected actual message line]
  (let [ok (= expected actual)]
    (report ok message line (when-not ok [(str "expected: " (pr-str expected)) (str "     got: " (pr-str actual))]))))

(defn threw [error message line]
  (report false message line [(str "it threw: " (or (ex-message error) (str error)))]))

(defmacro is
  ([form] (list 'koans.test/is form nil))
  ([form message]
   (let [line (:line (meta &form))
         head (when (seq? form) (first form))]
     (cond
       (blank-in? form)
       (list 'koans.test/report false (list 'koans.test/describe message) line [])

       (and (= head '=) (= 3 (count form)))
       (list 'try
             (list 'koans.test/compare-values (second form) (nth form 2) (list 'koans.test/describe message) line)
             (list 'catch :default 'e (list 'koans.test/threw 'e (list 'koans.test/describe message) line)))

       (= head 'thrown?)
       (list 'try
             (cons 'do (drop 2 form))
             (list 'koans.test/report false (list 'koans.test/describe message) line ["expected an exception, but none was thrown"])
             (list 'catch :default 'e
                   (list 'koans.test/report (if (= (second form) :default) true (list 'instance? (second form) 'e))
                         (list 'koans.test/describe message) line
                         ["it threw something else:" (list 'pr-str 'e)])))

       (= head 'thrown-with-msg?)
       (list 'try
             (cons 'do (drop 3 form))
             (list 'koans.test/report false (list 'koans.test/describe message) line ["expected an exception, but none was thrown"])
             (list 'catch :default 'e
                   (list 'koans.test/report (list 'boolean (list 're-find (nth form 2) (list 'ex-message 'e)))
                         (list 'koans.test/describe message) line
                         [(list 'str "its message was: " (list 'pr-str (list 'ex-message 'e)))])))

       :else
       (list 'try
             (list 'let ['value form]
                   (list 'koans.test/report (list 'boolean 'value) (list 'koans.test/describe message) line
                         [(list 'str "     got: " (list 'pr-str 'value))]))
             (list 'catch :default 'e (list 'koans.test/threw 'e (list 'koans.test/describe message) line)))))))

(defmacro testing [description & body]
  (list* 'binding ['koans.test/*contexts* (list 'conj 'koans.test/*contexts* description)] body))

(defmacro deftest [name & body]
  (list 'do (list* 'defn name [] body) (list name)))

(ns user (:require [clojure.string :as str] [koans.test :refer [is testing deftest ___]]))
