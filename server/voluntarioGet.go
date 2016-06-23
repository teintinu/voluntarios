package cvv

import (
	"appengine"
	"net/http"
)

func HandleVoluntarioGet(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	key := r.URL.Query().Get("key")
	v, err := QryVoluntarioPorId(ctx, key)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stringifyJsonToResponse(r, w, v)
}
