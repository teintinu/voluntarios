package cvv

import (
    "net/http"
	"appengine"
)

func HandleVoluntarioGet(w http.ResponseWriter, r *http.Request) {
    ctx := appengine.NewContext(r)
	key := r.URL.Query().Get("key")
    v, err := QryVoluntarioPorId(ctx, key)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
	
	encodeJsonToResponse(r, w, v)
}
