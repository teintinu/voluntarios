package cvv

import (
	// "appengine/aetest"
	// "bytes"
	// "encoding/json"
	// "net/http"
	// "net/http/httptest"
	"testing"
)

func x(t *testing.T) {
	t.Fatal("Failed to create req1")
}

// func RequisicaoJSON(t *testing.T, inst *aetest.Instance, url string, req_json interface{}, res_json interface{}) (req_http *http.Request, res_http *httptest.ResponseRecorder) {

// 	var str []byte
// 	var err error
// 	str, err = json.Marshal(req_json)
// 	if err != nil {
// 		t.Fatalf("Failed to create req1: %v", err)
// 	}

// 	// r := bytes.NewReader(str)

// 	// req_http, err = (*inst).NewRequest("POST", url, r)
// 	// if err != nil {
// 	// 	t.Fatalf("Erro ao criar requisicao: %v %v %v", url, req_json, err)
// 	// 	req_http = nil
// 	// 	res_http = nil
// 	// 	return
// 	// }

// 	// res_http = httptest.NewRecorder()

// 	// http.ServeMux.ServeHTTP(res_http, req_http)

// 	// if res_http.Code != 200 {
// 	// 	res_json = nil
// 	// 	t.Errorf("Erro de HTTP: response code %d body:\n%s", res_http.Code, res_http.Body.String())
// 	// 	return
// 	// }
// 	// if err := json.NewDecoder(res_http.Body).Decode(res_json); err != nil {
// 	// 	res_json = nil
// 	// 	t.Errorf("Erro ao decodificar JSON da resposta %v body:\n%s", err, res_http.Body.String())
// 	// 	return
// 	// }
// }
