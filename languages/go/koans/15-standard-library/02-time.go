// title: Time
// intro: A `time.Duration` counts nanoseconds, with constants like `time.Second` to multiply, and prints like `1m30s`. A `time.Time` can be added to, subtracted and compared, and `Format` writes it in the layout of a reference time: `2006-01-02 15:04:05`.
package koans

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTime(t *testing.T) {
	d := 90 * time.Second
	assert.Equal(t, ___, d.String(), "a Duration prints readably")
	assert.Equal(t, ___, d.Minutes(), "Minutes, as a float64")
	start := time.Date(2024, time.March, 1, 12, 0, 0, 0, time.UTC)
	later := start.Add(36 * time.Hour)
	assert.Equal(t, ___, later.Format("2006-01-02 15:04"), "Format lays out the time like the reference time")
	assert.Equal(t, ___, later.Sub(start), "Sub gives the Duration between two times")
	assert.Equal(t, ___, later.Weekday(), "Weekday")
	assert.Equal(t, ___, later.After(start), "After compares two times")
}
