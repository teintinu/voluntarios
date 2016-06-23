package cvv

import (
	"appengine"
	"net/http"
)

func HandleVoluntarioSave(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Query().Get("key")
	v := new(Voluntario)
	if parseJsonFromRequest(r, w, v) {
		ctx := appengine.NewContext(r)
		err := OpVoluntarioSave(ctx, &key, v)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else {
			stringifyJsonToResponse(r, w, key)
		}
	}

	// if err := json.NewEncoder(w).Encode(v); err != nil {
	//     panic(err)
	// }
}
