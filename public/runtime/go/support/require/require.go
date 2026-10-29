// Package require is testify's require, for koans: package assert's checks, but a failure ends
// the test there (t.FailNow), as testify's do.
package require

import "github.com/stretchr/testify/assert"

// TestingT is what require needs of a test: *testing.T is one.
type TestingT interface {
	Errorf(format string, args ...any)
	FailNow()
}

func stop(t TestingT, ok bool) {
	if !ok {
		t.FailNow()
	}
}

func Equal(t TestingT, expected, actual any, msgAndArgs ...any) {
	stop(t, assert.Equal(t, expected, actual, msgAndArgs...))
}
func NotEqual(t TestingT, expected, actual any, msgAndArgs ...any) {
	stop(t, assert.NotEqual(t, expected, actual, msgAndArgs...))
}
func True(t TestingT, value any, msgAndArgs ...any)  { stop(t, assert.True(t, value, msgAndArgs...)) }
func False(t TestingT, value any, msgAndArgs ...any) { stop(t, assert.False(t, value, msgAndArgs...)) }
func Nil(t TestingT, object any, msgAndArgs ...any)  { stop(t, assert.Nil(t, object, msgAndArgs...)) }
func NotNil(t TestingT, object any, msgAndArgs ...any) {
	stop(t, assert.NotNil(t, object, msgAndArgs...))
}
func Len(t TestingT, object any, length any, msgAndArgs ...any) {
	stop(t, assert.Len(t, object, length, msgAndArgs...))
}
func Contains(t TestingT, s, contains any, msgAndArgs ...any) {
	stop(t, assert.Contains(t, s, contains, msgAndArgs...))
}
func NoError(t TestingT, err error, msgAndArgs ...any) {
	stop(t, assert.NoError(t, err, msgAndArgs...))
}
func Error(t TestingT, err error, msgAndArgs ...any) { stop(t, assert.Error(t, err, msgAndArgs...)) }
func ErrorIs(t TestingT, err error, target any, msgAndArgs ...any) {
	stop(t, assert.ErrorIs(t, err, target, msgAndArgs...))
}
func EqualError(t TestingT, theError error, errString any, msgAndArgs ...any) {
	stop(t, assert.EqualError(t, theError, errString, msgAndArgs...))
}
