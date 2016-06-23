package cvv

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func decodeJsonFromRequest(r *http.Request, w http.ResponseWriter, d interface{}) bool {
	var bytes, err = ioutil.ReadAll(r.Body)
	if err == nil {
		err = json.Unmarshal(bytes, d)
	}
	if err != nil {
		var msg = err.Error() + " body: " + string(bytes)
		http.Error(w, msg, http.StatusInternalServerError)
		return false
	}
	return true
}

func encodeJsonToResponse(r *http.Request, w http.ResponseWriter, d interface{}) bool {
	fmt.Printf("enc %v", d)

	if err := json.NewEncoder(w).Encode(d); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return false
	}
	return true
}
