package cvv

import (
	"appengine"
	"net/http"
)

func HandleUserGet(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	key := r.URL.Query().Get("key")
	v, err := QryVoluntarioPorId(ctx, key)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	encodeJsonToResponse(r, w, v)
}

// func HandleUserSave(w http.ResponseWriter, r *http.Request) {
// 	key := r.URL.Query().Get("key")
// 	u := new(User)
// 	if decodeJsonFromRequest(r, w, u) {
// 		ctx := appengine.NewContext(r)
// 		err := UserOpSave(ctx, &key, u)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		} else {
// 			encodeJsonToResponse(r, w, key)
// 		}
// 	}

// 	// if err := json.NewEncoder(w).Encode(v); err != nil {
// 	//     panic(err)
// 	// }
// 	// if err := json.NewEncoder(w).Encode(v); err != nil {
// 	//     panic(err)
// 	// }
// }

// func HandleUserLoginWithPassword(w http.ResponseWriter, r *http.Request) {
// 	json := new(UserLoginWithPassword)
// 	if decodeJsonFromRequest(r, w, json) {
// 		ctx := appengine.NewContext(r)
// 		resumeToken, err := OpUserLoginWithPassword(ctx, json)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		} else {
// 			encodeJsonToResponse(r, w, resumeToken)
// 		}
// 	}
// }
