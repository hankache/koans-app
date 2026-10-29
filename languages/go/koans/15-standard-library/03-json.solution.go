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
	assert.Equal(t, `{"name":"Ann","tags":["admin"]}`, string(b), "tags name the keys, omitempty drops Age, and email isn't exported")
	var u User
	err = json.Unmarshal([]byte(`{"name":"Bob","age":41}`), &u)
	assert.NoError(t, err, "Unmarshal reads it back")
	assert.Equal(t, 41, u.Age, "Unmarshal fills each field from its key")
	var data map[string]any
	json.Unmarshal([]byte(`{"n": 1}`), &data)
	assert.Equal(t, 1.0, data["n"], "into an any, a JSON number becomes a float64")
}
