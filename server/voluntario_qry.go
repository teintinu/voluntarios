package cvv

import (
	"appengine/datastore"
)

func QryVoluntarioPorId(contexto Contexto, id string) (v Voluntario, err error) {
	var k *datastore.Key
	k, err = datastore.DecodeKey(id)
	if err == nil {
		err = datastore.Get(contexto.ctx, k, &v)
	}
	return
}
