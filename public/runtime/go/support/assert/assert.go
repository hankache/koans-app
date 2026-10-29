// Package assert is testify's assert, for koans: the same functions, called the same way
// (expected first, then actual, then an optional message), each reporting itself through the
// koans' testing package. Every answer slot takes any value, so a blank (___) fails its check
// whatever type the answer would have.
//
// One difference from testify: Equal compares an untyped constant's default type (int, float64,
// rune, string, bool) as Go itself would compare the constant, so assert.Equal(t, 3, 3.0) and
// assert.Equal(t, "on", state) with a named string type pass. testify reports those as different types.
package assert

import (
	"bytes"
	"errors"
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

// TestingT is what assertions need of a test: *testing.T is one.
type TestingT interface {
	Errorf(format string, args ...any)
}

type blank struct{}

// Blank is the koans' ___: an answer still to fill in.
var Blank any = blank{}

func isBlank(v any) bool { _, ok := v.(blank); return ok }

type reporter interface {
	Report(ok bool, description string, diagnostics ...string)
}

func message(msgAndArgs []any) string {
	switch {
	case len(msgAndArgs) == 0:
		return ""
	case len(msgAndArgs) == 1:
		if s, ok := msgAndArgs[0].(string); ok {
			return s
		}
		return fmt.Sprintf("%+v", msgAndArgs[0])
	default:
		if s, ok := msgAndArgs[0].(string); ok {
			return fmt.Sprintf(s, msgAndArgs[1:]...)
		}
		return fmt.Sprint(msgAndArgs...)
	}
}

func report(t TestingT, ok bool, msgAndArgs []any, diagnostics ...string) bool {
	if r, is := t.(reporter); is {
		r.Report(ok, message(msgAndArgs), diagnostics...)
	} else if !ok {
		t.Errorf("%s", strings.Join(append([]string{message(msgAndArgs)}, diagnostics...), "\n"))
	}
	return ok
}

// blanks reports a failure, with no diagnostics, if any answer is still ___.
func blanks(t TestingT, msgAndArgs []any, answers ...any) bool {
	for _, a := range answers {
		if isBlank(a) {
			report(t, false, msgAndArgs)
			return true
		}
	}
	return false
}

func expectedGot(expected, got string) []string {
	return []string{"expected: " + expected, "     got: " + got}
}

// Format shows a value as Go code would write it, without the koan's package name.
func Format(v any) string {
	switch x := v.(type) {
	case nil:
		return "nil"
	case error:
		return fmt.Sprintf("%q", x.Error())
	}
	return stripPackage(fmt.Sprintf("%#v", v))
}

// The koan's own types are in package main: shown without it, as the koan names them.
var mainPrefix = regexp.MustCompile(`\bmain\.`)

func stripPackage(s string) string { return mainPrefix.ReplaceAllString(s, "") }

func typeName(v any) string {
	if v == nil {
		return "nil"
	}
	return stripPackage(reflect.TypeOf(v).String())
}

// formatPair shows two values, with their types when the types differ.
func formatPair(a, b any) (string, string) {
	fa, fb := Format(a), Format(b)
	if reflect.TypeOf(a) != reflect.TypeOf(b) {
		fa += " (" + typeName(a) + ")"
		fb += " (" + typeName(b) + ")"
	}
	return fa, fb
}

// ObjectsAreEqual is testify's equality: bytes.Equal for byte slices, reflect.DeepEqual otherwise.
func ObjectsAreEqual(expected, actual any) bool {
	if expected == nil || actual == nil {
		return expected == actual
	}
	if exp, ok := expected.([]byte); ok {
		if act, ok := actual.([]byte); ok {
			return bytes.Equal(exp, act)
		}
		return false
	}
	return reflect.DeepEqual(expected, actual)
}

func family(k reflect.Kind) int {
	switch {
	case k >= reflect.Int && k <= reflect.Uint64, k == reflect.Float32, k == reflect.Float64:
		return 1
	case k == reflect.String:
		return 2
	case k == reflect.Bool:
		return 3
	case k == reflect.Complex64 || k == reflect.Complex128:
		return 4
	}
	return 0
}

// constantEqual: is expected, a value of an untyped constant's default type, equal to actual once
// converted to actual's type, without losing anything on the way?
func constantEqual(expected, actual any) bool {
	if expected == nil || actual == nil {
		return false
	}
	switch expected.(type) {
	case int, float64, rune, string, bool, complex128:
	default:
		return false
	}
	ev, at := reflect.ValueOf(expected), reflect.TypeOf(actual)
	if family(ev.Kind()) == 0 || family(ev.Kind()) != family(at.Kind()) && !(family(ev.Kind()) <= 1 && family(at.Kind()) <= 1) {
		return false
	}
	if !ev.CanConvert(at) {
		return false
	}
	converted := ev.Convert(at)
	if !reflect.DeepEqual(converted.Convert(ev.Type()).Interface(), expected) {
		return false
	}
	return reflect.DeepEqual(converted.Interface(), actual)
}

func equal(expected, actual any) bool {
	return ObjectsAreEqual(expected, actual) || constantEqual(expected, actual)
}

// Equal asserts that two values are equal.
func Equal(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	if equal(expected, actual) {
		return report(t, true, msgAndArgs)
	}
	e, a := formatPair(expected, actual)
	return report(t, false, msgAndArgs, expectedGot(e, a)...)
}

// Exactly asserts that two values are equal and of the same type.
func Exactly(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	if ObjectsAreEqual(expected, actual) {
		return report(t, true, msgAndArgs)
	}
	e, a := formatPair(expected, actual)
	return report(t, false, msgAndArgs, expectedGot(e, a)...)
}

// EqualValues asserts that two values are equal once converted to the same type.
func EqualValues(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	ok := equal(expected, actual)
	if !ok && expected != nil && actual != nil {
		ev, at := reflect.ValueOf(expected), reflect.TypeOf(actual)
		ok = ev.CanConvert(at) && reflect.DeepEqual(ev.Convert(at).Interface(), actual)
	}
	if ok {
		return report(t, true, msgAndArgs)
	}
	e, a := formatPair(expected, actual)
	return report(t, false, msgAndArgs, expectedGot(e, a)...)
}

// NotEqual asserts that two values differ.
func NotEqual(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	if !equal(expected, actual) {
		return report(t, true, msgAndArgs)
	}
	return report(t, false, msgAndArgs, "expected a value other than "+Format(actual))
}

func truth(t TestingT, want bool, value any, msgAndArgs []any) bool {
	if blanks(t, msgAndArgs, value) {
		return false
	}
	b, isBool := value.(bool)
	if !isBool {
		return report(t, false, msgAndArgs, expectedGot(fmt.Sprint(want), Format(value)+" ("+typeName(value)+")")...)
	}
	return report(t, b == want, msgAndArgs, expectedGot(fmt.Sprint(want), fmt.Sprint(b))...)
}

// True asserts that a value is true.
func True(t TestingT, value any, msgAndArgs ...any) bool { return truth(t, true, value, msgAndArgs) }

// False asserts that a value is false.
func False(t TestingT, value any, msgAndArgs ...any) bool { return truth(t, false, value, msgAndArgs) }

func isNil(v any) bool {
	if v == nil {
		return true
	}
	rv := reflect.ValueOf(v)
	switch rv.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice, reflect.UnsafePointer:
		return rv.IsNil()
	}
	return false
}

// Nil asserts that a value is nil.
func Nil(t TestingT, object any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, object) {
		return false
	}
	return report(t, isNil(object), msgAndArgs, expectedGot("nil", Format(object))...)
}

// NotNil asserts that a value is not nil.
func NotNil(t TestingT, object any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, object) {
		return false
	}
	return report(t, !isNil(object), msgAndArgs, "expected a value that isn't nil")
}

func isZero(v any) bool { return v == nil || reflect.ValueOf(v).IsZero() }

// Zero asserts that a value is its type's zero value.
func Zero(t TestingT, i any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, i) {
		return false
	}
	return report(t, isZero(i), msgAndArgs, "expected the zero value, got "+Format(i))
}

// NotZero asserts that a value is not its type's zero value.
func NotZero(t TestingT, i any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, i) {
		return false
	}
	return report(t, !isZero(i), msgAndArgs, "expected a value other than the zero value")
}

func isEmpty(v any) bool {
	if v == nil {
		return true
	}
	rv := reflect.ValueOf(v)
	switch rv.Kind() {
	case reflect.Chan, reflect.Map, reflect.Slice, reflect.String, reflect.Array:
		return rv.Len() == 0
	case reflect.Pointer:
		return rv.IsNil() || isEmpty(rv.Elem().Interface())
	}
	return rv.IsZero()
}

// Empty asserts that a value is empty: zero, or of length 0.
func Empty(t TestingT, object any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, object) {
		return false
	}
	return report(t, isEmpty(object), msgAndArgs, "expected it to be empty, got "+Format(object))
}

// NotEmpty asserts that a value is not empty.
func NotEmpty(t TestingT, object any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, object) {
		return false
	}
	return report(t, !isEmpty(object), msgAndArgs, "expected it not to be empty")
}

// Len asserts that a value has the given length.
func Len(t TestingT, object any, length any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, object, length) {
		return false
	}
	rv := reflect.ValueOf(object)
	switch rv.Kind() {
	case reflect.Array, reflect.Chan, reflect.Map, reflect.Slice, reflect.String:
	default:
		return report(t, false, msgAndArgs, Format(object)+" has no length")
	}
	return report(t, equal(length, rv.Len()), msgAndArgs, expectedGot(Format(length), fmt.Sprint(rv.Len()))...)
}

// contains: whether s (a string, slice, array or map's keys) holds element.
func contains(s, element any) (found, ok bool) {
	rv := reflect.ValueOf(s)
	switch rv.Kind() {
	case reflect.String:
		e, isString := element.(string)
		if !isString {
			return false, false
		}
		return strings.Contains(rv.String(), e), true
	case reflect.Map:
		for _, k := range rv.MapKeys() {
			if equal(element, k.Interface()) {
				return true, true
			}
		}
		return false, true
	case reflect.Slice, reflect.Array:
		for i := 0; i < rv.Len(); i++ {
			if equal(element, rv.Index(i).Interface()) {
				return true, true
			}
		}
		return false, true
	}
	return false, false
}

// Contains asserts that a string, slice, array or map's keys hold an element.
func Contains(t TestingT, s, contains_ any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, s, contains_) {
		return false
	}
	found, ok := contains(s, contains_)
	if !ok {
		return report(t, false, msgAndArgs, Format(s)+" can't contain "+Format(contains_))
	}
	return report(t, found, msgAndArgs, Format(s)+" does not contain "+Format(contains_))
}

// NotContains asserts that a string, slice, array or map's keys don't hold an element.
func NotContains(t TestingT, s, contains_ any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, s, contains_) {
		return false
	}
	found, ok := contains(s, contains_)
	if !ok {
		return report(t, false, msgAndArgs, Format(s)+" can't contain "+Format(contains_))
	}
	return report(t, !found, msgAndArgs, Format(s)+" contains "+Format(contains_))
}

// ElementsMatch asserts that two lists hold the same elements, in any order.
func ElementsMatch(t TestingT, listA, listB any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, listA, listB) {
		return false
	}
	a, b := reflect.ValueOf(listA), reflect.ValueOf(listB)
	same := (a.Kind() == reflect.Slice || a.Kind() == reflect.Array) && (b.Kind() == reflect.Slice || b.Kind() == reflect.Array) && a.Len() == b.Len()
	if same {
		used := make([]bool, b.Len())
		for i := 0; i < a.Len() && same; i++ {
			same = false
			for j := 0; j < b.Len(); j++ {
				if !used[j] && equal(a.Index(i).Interface(), b.Index(j).Interface()) {
					used[j], same = true, true
					break
				}
			}
		}
	}
	return report(t, same, msgAndArgs, expectedGot(Format(listA), Format(listB))...)
}

// compare orders two numbers or two strings: -1, 0 or 1, and whether they could be compared.
func compare(a, b any) (int, bool) {
	av, bv := reflect.ValueOf(a), reflect.ValueOf(b)
	if bv.IsValid() && av.IsValid() && av.Type() != bv.Type() && constantEqual(a, b) {
		return 0, true
	}
	if av.IsValid() && bv.IsValid() && av.Type() != bv.Type() && av.CanConvert(bv.Type()) && family(av.Kind()) == family(bv.Kind()) {
		av = av.Convert(bv.Type())
	}
	if !av.IsValid() || !bv.IsValid() || av.Type() != bv.Type() {
		return 0, false
	}
	switch {
	case av.CanInt():
		return cmp3(av.Int() < bv.Int(), av.Int() > bv.Int()), true
	case av.CanUint():
		return cmp3(av.Uint() < bv.Uint(), av.Uint() > bv.Uint()), true
	case av.CanFloat():
		return cmp3(av.Float() < bv.Float(), av.Float() > bv.Float()), true
	case av.Kind() == reflect.String:
		return cmp3(av.String() < bv.String(), av.String() > bv.String()), true
	}
	return 0, false
}

func cmp3(less, more bool) int {
	switch {
	case less:
		return -1
	case more:
		return 1
	}
	return 0
}

func ordered(t TestingT, e1, e2 any, ok func(int) bool, words string, msgAndArgs []any) bool {
	if blanks(t, msgAndArgs, e1, e2) {
		return false
	}
	c, comparable := compare(e1, e2)
	if !comparable {
		return report(t, false, msgAndArgs, "can't compare "+Format(e1)+" with "+Format(e2))
	}
	return report(t, ok(c), msgAndArgs, fmt.Sprintf("%s is not %s %s", Format(e1), words, Format(e2)))
}

// Greater asserts that e1 > e2.
func Greater(t TestingT, e1, e2 any, msgAndArgs ...any) bool {
	return ordered(t, e1, e2, func(c int) bool { return c > 0 }, "greater than", msgAndArgs)
}

// GreaterOrEqual asserts that e1 >= e2.
func GreaterOrEqual(t TestingT, e1, e2 any, msgAndArgs ...any) bool {
	return ordered(t, e1, e2, func(c int) bool { return c >= 0 }, "greater than or equal to", msgAndArgs)
}

// Less asserts that e1 < e2.
func Less(t TestingT, e1, e2 any, msgAndArgs ...any) bool {
	return ordered(t, e1, e2, func(c int) bool { return c < 0 }, "less than", msgAndArgs)
}

// LessOrEqual asserts that e1 <= e2.
func LessOrEqual(t TestingT, e1, e2 any, msgAndArgs ...any) bool {
	return ordered(t, e1, e2, func(c int) bool { return c <= 0 }, "less than or equal to", msgAndArgs)
}

// InDelta asserts that two numbers are within delta of each other.
func InDelta(t TestingT, expected, actual any, delta float64, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	toFloat := func(v any) (float64, bool) {
		rv := reflect.ValueOf(v)
		if !rv.IsValid() || !rv.CanConvert(reflect.TypeOf(0.0)) || family(rv.Kind()) != 1 {
			return 0, false
		}
		return rv.Convert(reflect.TypeOf(0.0)).Float(), true
	}
	e, ok1 := toFloat(expected)
	a, ok2 := toFloat(actual)
	if !ok1 || !ok2 {
		return report(t, false, msgAndArgs, "both values must be numbers")
	}
	d := e - a
	return report(t, d <= delta && d >= -delta, msgAndArgs, expectedGot(Format(expected), Format(actual))...)
}

// IsType asserts that object has the same type as expectedType.
func IsType(t TestingT, expectedType, object any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expectedType) {
		return false
	}
	return report(t, reflect.TypeOf(expectedType) == reflect.TypeOf(object), msgAndArgs, expectedGot(typeName(expectedType), typeName(object))...)
}

// Same asserts that two pointers point to the same thing.
func Same(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	ev, av := reflect.ValueOf(expected), reflect.ValueOf(actual)
	same := ev.Kind() == reflect.Pointer && av.Kind() == reflect.Pointer && ev.Type() == av.Type() && ev.Pointer() == av.Pointer()
	return report(t, same, msgAndArgs, "expected the same pointer")
}

// NotSame asserts that two pointers point to different things.
func NotSame(t TestingT, expected, actual any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	ev, av := reflect.ValueOf(expected), reflect.ValueOf(actual)
	same := ev.Kind() == reflect.Pointer && av.Kind() == reflect.Pointer && ev.Type() == av.Type() && ev.Pointer() == av.Pointer()
	return report(t, !same, msgAndArgs, "expected different pointers")
}

// Regexp asserts that str matches the regular expression rx (a string or *regexp.Regexp).
func Regexp(t TestingT, rx any, str any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, rx, str) {
		return false
	}
	var re *regexp.Regexp
	switch r := rx.(type) {
	case *regexp.Regexp:
		re = r
	case string:
		var err error
		if re, err = regexp.Compile(r); err != nil {
			return report(t, false, msgAndArgs, err.Error())
		}
	default:
		return report(t, false, msgAndArgs, "a regular expression is a string or a *regexp.Regexp")
	}
	return report(t, re.MatchString(fmt.Sprint(str)), msgAndArgs, fmt.Sprintf("%s does not match %s", Format(str), re))
}

// NoError asserts that err is nil.
func NoError(t TestingT, err error, msgAndArgs ...any) bool {
	return report(t, err == nil, msgAndArgs, expectedGot("no error", Format(err))...)
}

// Error asserts that err is not nil.
func Error(t TestingT, err error, msgAndArgs ...any) bool {
	return report(t, err != nil, msgAndArgs, expectedGot("an error", "nil")...)
}

// EqualError asserts that err's message is errString.
func EqualError(t TestingT, theError error, errString any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, errString) {
		return false
	}
	if theError == nil {
		return report(t, false, msgAndArgs, expectedGot(Format(errString), "nil")...)
	}
	return report(t, equal(errString, theError.Error()), msgAndArgs, expectedGot(Format(errString), Format(theError.Error()))...)
}

// ErrorContains asserts that err's message contains a string.
func ErrorContains(t TestingT, theError error, contains any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, contains) {
		return false
	}
	if theError == nil {
		return report(t, false, msgAndArgs, "expected an error, got nil")
	}
	s, _ := contains.(string)
	return report(t, strings.Contains(theError.Error(), s), msgAndArgs, Format(theError.Error())+" does not contain "+Format(contains))
}

// ErrorIs asserts that errors.Is(err, target).
func ErrorIs(t TestingT, err error, target any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, target) {
		return false
	}
	te, _ := target.(error)
	return report(t, errors.Is(err, te), msgAndArgs, expectedGot(Format(target)+" in the chain", Format(err))...)
}

// NotErrorIs asserts that !errors.Is(err, target).
func NotErrorIs(t TestingT, err error, target any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, target) {
		return false
	}
	te, _ := target.(error)
	return report(t, !errors.Is(err, te), msgAndArgs, Format(target)+" is in the chain of "+Format(err))
}

// ErrorAs asserts that errors.As(err, target).
func ErrorAs(t TestingT, err error, target any, msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, target) {
		return false
	}
	return report(t, errors.As(err, target), msgAndArgs, "no error in the chain of "+Format(err)+" matches "+typeName(target))
}

// didPanic calls f and returns whether it panicked, and with what.
func didPanic(f func()) (panicked bool, value any) {
	panicked = true
	func() {
		defer func() { value = recover() }()
		f()
		panicked = false
	}()
	return
}

// Panics asserts that f panics.
func Panics(t TestingT, f func(), msgAndArgs ...any) bool {
	panicked, _ := didPanic(f)
	return report(t, panicked, msgAndArgs, "expected a panic")
}

// NotPanics asserts that f doesn't panic.
func NotPanics(t TestingT, f func(), msgAndArgs ...any) bool {
	panicked, value := didPanic(f)
	return report(t, !panicked, msgAndArgs, "it panicked with "+Format(value))
}

// PanicsWithValue asserts that f panics with the given value.
func PanicsWithValue(t TestingT, expected any, f func(), msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, expected) {
		return false
	}
	panicked, value := didPanic(f)
	if !panicked {
		return report(t, false, msgAndArgs, expectedGot("a panic with "+Format(expected), "no panic")...)
	}
	e, a := formatPair(expected, value)
	return report(t, equal(expected, value), msgAndArgs, expectedGot(e, a)...)
}

// PanicsWithError asserts that f panics with an error whose message is errString.
func PanicsWithError(t TestingT, errString any, f func(), msgAndArgs ...any) bool {
	if blanks(t, msgAndArgs, errString) {
		return false
	}
	panicked, value := didPanic(f)
	err, isErr := value.(error)
	if !panicked || !isErr {
		return report(t, false, msgAndArgs, expectedGot("a panic with an error", Format(value))...)
	}
	return report(t, equal(errString, err.Error()), msgAndArgs, expectedGot(Format(errString), Format(err.Error()))...)
}

// Fail reports a failure.
func Fail(t TestingT, failureMessage string, msgAndArgs ...any) bool {
	return report(t, false, msgAndArgs, failureMessage)
}
