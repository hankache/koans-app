// Package testing stands in for Go's own, for koans: the same T, with Error, Fatal, Run, Helper,
// Cleanup, Skip and the rest, but every check reports itself as a TAP line ("ok 3 - message"), so
// the site can show each one. A failure carries the koan's line ("# at web line 12"), found on
// the stack. Tests run one after another, each in its goroutine, as go test runs them.
package testing

import (
	"fmt"
	"os"
	"runtime"
	"runtime/debug"
	"strings"
)

// The koan's file, as the worker compiles it.
const koanFile = "koan_test.go"

var checks int

// The functions that called Helper: a failure's line skips them, to the line that called them.
var helpers = map[string]bool{}

// TB is the interface common to T and B, for helpers that take either.
type TB interface {
	Cleanup(func())
	Error(args ...any)
	Errorf(format string, args ...any)
	Fail()
	FailNow()
	Failed() bool
	Fatal(args ...any)
	Fatalf(format string, args ...any)
	Helper()
	Log(args ...any)
	Logf(format string, args ...any)
	Name() string
	Skip(args ...any)
	SkipNow()
	Skipf(format string, args ...any)
	Skipped() bool
}

// T is passed to Test functions.
type T struct {
	name     string
	parent   *T
	failed   bool
	skipped  bool
	checked  bool
	cleanups []func()
}

var _ TB = (*T)(nil)

// InternalTest is a test, as Main receives them.
type InternalTest struct {
	Name string
	F    func(*T)
}

// Line is the koan's line that called into the testing code, past any helpers, or 0.
func Line() int {
	pcs := make([]uintptr, 64)
	frames := runtime.CallersFrames(pcs[:runtime.Callers(2, pcs)])
	line := 0
	for {
		f, more := frames.Next()
		if strings.HasSuffix(f.File, koanFile) {
			if line == 0 || helpers[f.Function] {
				line = f.Line
			}
			if !helpers[f.Function] {
				return f.Line
			}
		}
		if !more {
			return line
		}
	}
}

// Report prints one check as TAP: ok or not, its description, and on failure its diagnostics
// and the koan's line. Package assert reports through it.
func (t *T) Report(ok bool, description string, diagnostics ...string) {
	checks++
	for p := t; p != nil; p = p.parent {
		p.checked = true
	}
	status := "ok"
	if !ok {
		status = "not ok"
		t.Fail()
	}
	if description == "" {
		description = t.name
	}
	fmt.Fprintf(os.Stdout, "%s %d - %s\n", status, checks, oneLine(description))
	if !ok {
		var b strings.Builder
		for _, d := range diagnostics {
			for _, l := range strings.Split(d, "\n") {
				b.WriteString("# " + l + "\n")
			}
		}
		fmt.Fprintf(&b, "# at web line %d\n", Line())
		os.Stderr.WriteString(b.String())
	}
}

func oneLine(s string) string { return strings.ReplaceAll(s, "\n", " ") }

func (t *T) Name() string { return t.name }

func (t *T) Fail() {
	for p := t; p != nil; p = p.parent {
		p.failed = true
	}
}

func (t *T) Failed() bool { return t.failed }

// FailNow ends the test, as go test does: its goroutine stops, its deferred calls run.
func (t *T) FailNow() {
	t.Fail()
	runtime.Goexit()
}

func (t *T) Error(args ...any)                 { t.Report(false, strings.TrimSuffix(fmt.Sprintln(args...), "\n")) }
func (t *T) Errorf(format string, args ...any) { t.Report(false, fmt.Sprintf(format, args...)) }
func (t *T) Fatal(args ...any)                 { t.Error(args...); t.FailNow() }
func (t *T) Fatalf(format string, args ...any) { t.Errorf(format, args...); t.FailNow() }

// Log prints, indented, as go test -v would.
func (t *T) Log(args ...any)                 { fmt.Print("    " + fmt.Sprintln(args...)) }
func (t *T) Logf(format string, args ...any) { fmt.Printf("    "+format+"\n", args...) }

// Helper marks its caller as a helper: failures inside it report the line that called it.
func (t *T) Helper() {
	if pc, _, _, ok := runtime.Caller(1); ok {
		helpers[runtime.FuncForPC(pc).Name()] = true
	}
}
func (t *T) Parallel() {}

func (t *T) Cleanup(f func()) { t.cleanups = append(t.cleanups, f) }

func (t *T) SkipNow() {
	t.skipped = true
	runtime.Goexit()
}
func (t *T) Skip(args ...any)                 { t.SkipNow() }
func (t *T) Skipf(format string, args ...any) { t.SkipNow() }
func (t *T) Skipped() bool                    { return t.skipped }

// Run runs f as a subtest named name, and reports whether it passed.
func (t *T) Run(name string, f func(t *T)) bool {
	sub := &T{name: t.name + "/" + strings.ReplaceAll(name, " ", "_"), parent: t}
	sub.run(f)
	return !sub.failed
}

func (t *T) run(f func(t *T)) {
	done := make(chan struct{})
	go func() {
		defer close(done)
		defer func() {
			for i := len(t.cleanups) - 1; i >= 0; i-- {
				t.cleanups[i]()
			}
		}()
		f(t)
	}()
	<-done
}

// Main runs the tests in order. A test that checks nothing reports itself, pass or fail.
// The program exits with 1 if any test failed, as go test does.
func Main(tests []InternalTest) {
	// Runaway recursion stops at 64 MB of stack, with Go's "stack overflow", not gigabytes later.
	debug.SetMaxStack(64 << 20)
	failed := false
	for _, test := range tests {
		t := &T{name: test.Name}
		t.run(test.F)
		if !t.checked && !t.skipped {
			t.Report(!t.failed, test.Name)
		}
		failed = failed || t.failed
	}
	if failed {
		os.Exit(1)
	}
}

// Short reports whether -test.short is set: never, here.
func Short() bool { return false }

// Verbose reports whether -test.v is set: never, here.
func Verbose() bool { return false }

// Testing reports whether the program is a test: always, here.
func Testing() bool { return true }
