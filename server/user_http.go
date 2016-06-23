package cvv

import (
	"appengine"
	"log"
	"net/http"
)

func HandleQryUserPorId(w http.ResponseWriter, r *http.Request) {
	log.Printf("HandleQryUserPorId %v", r.URL.Query().Get("id"))
	var ctx = CriarContexto(appengine.NewContext(r))
	var key = r.URL.Query().Get("id")

	var user, err = QryUserPorId(ctx, key)
	log.Printf("HandleQryUserPorId usuario %v", user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stringifyJsonToResponse(r, w, user)
}

type HandleUserSignUpWithPasswordResult struct {
	Error error
	Id    string
}

func HandleUserSignupWithPassword(w http.ResponseWriter, r *http.Request) {
	var ctx = CriarContexto(appengine.NewContext(r))
	var login = new(UserLoginDataWithPassword)
	if parseJsonFromRequest(r, w, login) {
		key, err := UserOpSignUpWithPassword(ctx, login)

		var result HandleUserSignUpWithPasswordResult
		result.Error = err
		if err == nil {
			result.Id = key.String()
		}
		stringifyJsonToResponse(r, w, result)
	}
}
