package cvv

import (
	"net/http"
)

func init() {
	http.HandleFunc("/api/hw", handleHello)
	http.HandleFunc("/api/hw2", handleHello2)

	http.HandleFunc("/api/voluntario/get", HandleVoluntarioGet)
	http.HandleFunc("/api/voluntario/save", HandleVoluntarioSave)
}
