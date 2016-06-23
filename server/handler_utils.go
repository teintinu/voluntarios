package cvv

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func parseJsonFromRequest(r *http.Request, w http.ResponseWriter, d interface{}) bool {
	var bytes, err = ioutil.ReadAll(r.Body)
	log.Printf("parse = %s", string(bytes))
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

func stringifyJsonToResponse(r *http.Request, w http.ResponseWriter, d interface{}) bool {
	log.Printf("stringify %v", d)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	var err = json.NewEncoder(w).Encode(d)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return false
	}
	return true
}
