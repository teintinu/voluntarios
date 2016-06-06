package cvv

import (
    "net/http"
    "encoding/json"
)

func decodeJsonFromRequest(r *http.Request, w http.ResponseWriter, d interface{} ) bool {
    if err := json.NewDecoder(r.Body).Decode(d); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
		return false;
    }	
	return true
}

func encodeJsonToResponse(r *http.Request, w http.ResponseWriter, d interface{} ) bool {
    if err := json.NewEncoder(w).Encode(d); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
		return false;
    }	
	return true
}