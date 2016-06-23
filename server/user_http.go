package cvv

import (
	"appengine"
	"net/http"
)

func HandleQryUserPorId(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	key := r.URL.Query().Get("key")
	v, err := QryVoluntarioPorId(ctx, key)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stringifyJsonToResponse(r, w, v)
}

type HandleUserSignUpWithPasswordResult struct {
	Error error
	Id    string
}

func HandleUserSignupWithPassword(w http.ResponseWriter, r *http.Request) {
	var login = new(UserLoginDataWithPassword)
	if parseJsonFromRequest(r, w, login) {
		ctx := appengine.NewContext(r)
		key, err := UserOpSignUpWithPassword(ctx, login)

		var result HandleUserSignUpWithPasswordResult
		result.Error = err
		if err == nil {
			result.Id = key.String()
		}
		stringifyJsonToResponse(r, w, result)
	}
}
