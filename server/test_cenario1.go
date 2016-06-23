// private

// usuario: testesoa@teste se cadastra usando senha própria

package cvv

import (
	"appengine"
	"appengine/aetest"
	"appengine/datastore"
	"testing"
	// "net/http/httptest"
	// "encoding/json"
	// "bytes"
)

type Cenario1 struct {
	idUsuario string
}

func CriaCenario1(t *testing.T) (contexto *Contexto, cenario *Cenario1) {
	var context appengine.Context
	var err error
	context, err = aetest.NewContext(nil)
	if err != nil {
		t.Fatal(err)
	}

	contexto = CriarContexto(context)

	login := UserLoginDataWithPassword{
		Email:        "testesoa@teste",
		PasswordHash: "123",
	}

	var key *datastore.Key
	key, err = UserOpSignUpWithPassword(contexto, &login)
	if err != nil {
		t.Fatalf("Failed to UserOpSave: %v", err)
		contexto = nil
	}

	cenario = new(Cenario1)
	cenario.idUsuario = key.String()
	return
}
