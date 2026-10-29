package koans

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTime(t *testing.T) {
	d := 90 * time.Second
	assert.Equal(t, "1m30s", d.String(), "a Duration prints readably")
	assert.Equal(t, 1.5, d.Minutes(), "Minutes, as a float64")
	start := time.Date(2024, time.March, 1, 12, 0, 0, 0, time.UTC)
	later := start.Add(36 * time.Hour)
	assert.Equal(t, "2024-03-03 00:00", later.Format("2006-01-02 15:04"), "Format lays out the time like the reference time")
	assert.Equal(t, 36*time.Hour, later.Sub(start), "Sub gives the Duration between two times")
	assert.Equal(t, time.Sunday, later.Weekday(), "Weekday")
	assert.Equal(t, true, later.After(start), "After compares two times")
}
