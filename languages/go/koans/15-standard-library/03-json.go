// title: JSON
// intro: `encoding/json` turns Go values into JSON and back. Only exported fields, the capitalized ones, are included. A struct tag such as `json:"name"` sets a field's key, and `omitempty` leaves the field out when it's zero.
package koans

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
)

type User struct {
	Name  string   `json:"name"`
	Age   int      `json:"age,omitempty"`
	Tags  []string `json:"tags"`
	email string
}

func TestJSON(t *testing.T) {
	b, err := json.Marshal(User{Name: "Ann", Tags: []string{"admin"}, email: "ann@example.com"})
	assert.NoError(t, err, "Marshal fails only for values JSON can't hold")
	assert.Equal(t, ___, string(b), "tags name the keys, omitempty drops Age, and email isn't exported")
	var u User
	err = json.Unmarshal([]byte(`{"name":"Bob","age":41}`), &u)
	assert.NoError(t, err, "Unmarshal reads it back")
	assert.Equal(t, ___, u.Age, "Unmarshal fills each field from its key")
	var data map[string]any
	json.Unmarshal([]byte(`{"n": 1}`), &data)
	assert.Equal(t, ___, data["n"], "into an any, a JSON number becomes a float64")
}
