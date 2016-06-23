package cvv

import (
	"appengine"
	"appengine/datastore"
	"time"
	//	"encoding/hex"
)

func UserOpSignUpWithPassword(ctx appengine.Context, login *UserLoginDataWithPassword) (key *datastore.Key, err error) {
	var u User
	u.Emails = []UserEmail{
		UserEmail{
			Address:  login.Email,
			Verified: true,
			Active:   true,
		},
	}
	u.Services = []UserServices{
		UserServices{
			Name:    "password",
			Token:   login.PasswordHash,
			Options: "",
			Expires: time.Now().Add(10000),
		},
	}
	key = datastore.NewKey(ctx, "User", login.Email, 0, nil)
	_, err = datastore.Put(ctx, key, &u)
	return
}

// hex.EncodeToString(New128()),

// func UserOpAddEmail(ctx appengine.Context, existingKey string, u *User) (key string, err error) {
// 	u.Tokens = nil
// 	if existingKey == "" {
// 		nk := datastore.NewKey(ctx, "User", "hoda5", 0, nil)
// 		ak := datastore.NewIncompleteKey(ctx, "User", nk)
// 		key = ak.Encode()
// 		_, err = datastore.Put(ctx, ak, u)
// 	} else {
// 		key = existingKey
// 		k, err := datastore.DecodeKey(key)
// 		if err != nil {
// 			_, err = datastore.Put(ctx, k, u)
// 		}
// 	}
// 	return
// }

// func UserOpChangeAvatar(ctx appengine.Context, existingKey string, u *User) (key string, err error) {
//   u.Tokens = nil
//   if existingKey == "" {
//     nk := datastore.NewKey(ctx, "User", "hoda5", 0, nil)
//     ak := datastore.NewIncompleteKey(ctx, "User", nk)
//     key = ak.Encode()
//     _, err = datastore.Put(ctx, ak, u)
//   } else {
//     key = existingKey
//     k, err := datastore.DecodeKey(key)
//     if err != nil {
//       _, err = datastore.Put(ctx, k, u)
//     }
//   }
//   return
// }
// func UserOpLoginWithPassword(ctx appengine.Context, data *UserLoginWithPassword) (err error, resumeToken string) {
// 	u.Tokens = nil
// 	if *key == "" {
// 		nk := datastore.NewKey(ctx, "User", "hoda5", 0, nil)
// 		ak := datastore.NewIncompleteKey(ctx, "User", nk)
// 		*key = ak.Encode()
// 		_, err = datastore.Put(ctx, ak, u)
// 	} else {
// 		k, err := datastore.DecodeKey(*key)
// 		if err != nil {
// 			_, err = datastore.Put(ctx, k, u)
// 		}
// 	}
// 	return
// }
