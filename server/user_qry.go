package cvv

import (
	"appengine"
	"appengine/datastore"
	"strings"
)

func QryUserPorId(ctx appengine.Context, id string) (u User, err error) {
	var s = strings.Split(id, "/User,")
	var key = datastore.NewKey(ctx, "User", s[1], 0, nil)
	if err == nil {
		err = datastore.Get(ctx, key, &u)
	}
	return
}

func QryUserPorEmail(ctx appengine.Context, email string, allowUnvefified bool, allowInactives bool) (key *datastore.Key, user *User, err error) {
	var query = datastore.
		NewQuery("User").
		Filter("Emails.Address=", email)
	// if !allowUnvefified {
	// 	query.Filter("Emails.Verified =", true)
	// }
	// if !allowInactives {
	// 	query.Filter("Emails.Active =", true)
	// }
	var cursor = query.Run(ctx)
	var u User = User{}
	key, err = cursor.Next(&u)
	user = &u
	return
}
