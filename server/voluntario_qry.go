package cvv

import (
	"appengine"
	"appengine/datastore"
)

func QryVoluntarioPorId(ctx appengine.Context, id string) (v Voluntario, err error) {
	var k *datastore.Key
	k, err = datastore.DecodeKey(id)
	if err == nil {
		err = datastore.Get(ctx, k, &v)
	}
	return
}
