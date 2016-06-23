package cvv

import (
	"appengine/datastore"
	"strings"
)

func QryUserPorId(contexto *Contexto, id string) (u *User, err error) {
	var s = strings.Split(id, "/User,")
	var key = datastore.NewKey(contexto.ctx, "User", s[1], 0, nil)
	if err == nil {
		var usr User
		err = datastore.Get(contexto.ctx, key, &usr)
		u = &usr
	}
	return
}

func QryUserPorEmail(contexto *Contexto, email string, allowUnvefified bool, allowInactives bool) (key *datastore.Key, user *User, err error) {
	var query = datastore.
		NewQuery("User").
		Filter("Emails.Address=", email)
	if !allowUnvefified {
		query.Filter("Emails.Verified =", true)
	}
	if !allowInactives {
		query.Filter("Emails.Active =", true)
	}
	var cursor = query.Run(contexto.ctx)
	var u User
	key, err = cursor.Next(&u)
	user = &u
	return
}
