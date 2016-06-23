package cvv

import (
	"appengine/datastore"
	"encoding/hex"
	"errors"
	"log"
	"time"
)

type UserLoginDataWithPassword struct {
	Email        string
	PasswordHash string
	SessionName  string
}

func UserOpSignUpWithPassword(contexto *Contexto, login *UserLoginDataWithPassword) (key *datastore.Key, err error) {
	var u User
	u.Emails = []UserEmail{
		UserEmail{
			Address:  login.Email,
			Verified: true,
			Active:   true,
		},
	}
	u.Services = []UserService{
		UserService{
			Name:    "password",
			Token:   login.PasswordHash,
			Options: "",
		},
	}
	key = datastore.NewKey(contexto.ctx, "User", login.Email, 0, nil)
	_, err = datastore.Put(contexto.ctx, key, &u)
	return
}

func UserOpLoginWithPassword(contexto *Contexto, login *UserLoginDataWithPassword) (err error) {
	var keyUser, user, err1 = QryUserPorEmail(contexto, login.Email, false, false)
	if err1 != nil {
		err = err1
		return
	}

	var servico *UserService
	for i := range user.Services {
		servico = &user.Services[i]
		if servico.Name == "password" && servico.Token == login.PasswordHash {
			err = criarSessaoDeLogin(contexto, keyUser, user, login.SessionName)
			return
		}
	}

	err = errors.New("invalid login")

	return
}

func UserOpLogout(contexto *Contexto, token string) (err error) {
	var key = datastore.NewKey(contexto.ctx, "LoginSession", token, 0, nil)
	err = datastore.Delete(contexto.ctx, key)
	contexto.resume_token = ""
	contexto.usuarioLogadoId = ""
	return
}

func criarSessaoDeLogin(contexto *Contexto, keyUser *datastore.Key, user *User, sessionName string) (err error) {
	var key = datastore.NewKey(contexto.ctx, "LoginSession", hex.EncodeToString(New128().Bytes()), 0, nil)
	var s = LoginSession{
		UserId:      keyUser.String(),
		SessionName: sessionName,
		Expires:     time.Now().AddDate(0, 0, 1),
	}
	_, err = datastore.Put(contexto.ctx, key, &s)

	if err == nil {
		log.Printf("nao deu erro %v ", user)
		contexto.resume_token = key.StringID()
		contexto.usuarioLogadoId = keyUser.String()
	}
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
