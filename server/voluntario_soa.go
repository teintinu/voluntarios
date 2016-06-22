package cvv

import (
	"appengine"
	"appengine/datastore"
)

func OpVoluntarioSave(ctx appengine.Context, key *string, v *Voluntario) (err error) {
	if *key == "" {
		nk := datastore.NewKey(ctx, "Voluntario", "cvv", 0, nil)
		ak := datastore.NewIncompleteKey(ctx, "Voluntario", nk)
		*key = ak.Encode()
		_, err = datastore.Put(ctx, ak, v)
	} else {
		k, err := datastore.DecodeKey(*key)
		if err != nil {
			_, err = datastore.Put(ctx, k, v)
		}
	}
	return
}
