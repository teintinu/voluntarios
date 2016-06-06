package cvv

import (
	"appengine"
	"appengine/datastore"
)

func QryVoluntarioPorId(ctx appengine.Context, key string) (v Voluntario, err error) {    
    var k *datastore.Key
    k, err = datastore.DecodeKey(key)
	if (err == nil) {
        err = datastore.Get(ctx, k, &v)
	}	
	return
}
