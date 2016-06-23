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

	encodeJsonToResponse(r, w, v)
}

type HandleUserSignUpWithPasswordResult struct {
	err error
	id  string
}

func HandleUserSignupWithPassword(w http.ResponseWriter, r *http.Request) {
	var login = new(UserLoginDataWithPassword)
	if decodeJsonFromRequest(r, w, login) {
		ctx := appengine.NewContext(r)
		key, err := UserOpSignUpWithPassword(ctx, login)

		var result HandleUserSignUpWithPasswordResult
		result.err = err
		if err == nil {
			result.id = key.String()
		}
		encodeJsonToResponse(r, w, result)
	}

	// if err := json.NewEncoder(w).Encode(v); err != nil {
	//     panic(err)
	// }
	// if err := json.NewEncoder(w).Encode(v); err != nil {
	//     panic(err)
	// }
}
