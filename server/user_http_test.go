package cvv

import (
	"appengine"
	"appengine/aetest"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func requisicaoJSON(t *testing.T, inst *aetest.Instance, url string, json_requisicao interface{}) (req *http.Request, res *httptest.ResponseRecorder) {

	var str []byte
	var err error
	str, err = json.Marshal(json_requisicao)
	if err != nil {
		t.Fatalf("Failed to create req1: %v", err)
	}

	r := bytes.NewReader(str)

	req, err = (*inst).NewRequest("POST", url, r)
	if err != nil {
		t.Fatalf("Erro ao criar requisicao: %v %v %v", url, json_requisicao, err)
		req = nil
		res = nil
		return
	}

	res = httptest.NewRecorder()
	return
}

func TestInternal_UserSignUpWithPassword(t *testing.T) {
	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Fatalf("Failed to create instance: %v", err)
	}
	defer inst.Close()
	v := UserLoginDataWithPassword{
		Email:        "testehttp@teste",
		PasswordHash: "1234",
	}
	var req, res = requisicaoJSON(t, inst, "/api/user/save", v)
  if (res != nil)
  {
  	HandleUserSave(res, req)

  	if resp1.Code != 200 {
  		t.Errorf("Got response code %d; want %d; body:\n%s", resp1.Code, 200, resp1.Body.String())
  		return
  	}

  	key := new(string)

  	if err := json.NewDecoder(resp1.Body).Decode(key); err != nil {
  		t.Error(err)
  		return
  	}

  	if *key == "" {
  		t.Errorf("Key expected")
  		return
  	}

  	req2, err2 := inst.NewRequest("GET", "/api/user/get?key="+*key, nil)
  	if err2 != nil {
  		t.Fatalf("Failed to create req2: %v", err2)
  		return
  	}

  	resp2 := httptest.NewRecorder()
  	HandleUserGet(resp2, req2)

  	if resp2.Code != 200 {
  		t.Errorf("Got response code %d; want %d; body:\n%s", resp2.Code, 200, resp2.Body.String())
  		return
  	}

  	u2 := new(User)

  	if err := json.NewDecoder(resp2.Body).Decode(u2); err != nil {
  		t.Fatal(err)
  		return
  	}

  	if u2.Emails[0].Address != "testehttp@teste" {
  		t.Errorf("Got nome %s; want %s", u2.Emails[0].Address, "testehttp@teste")
  	}
  }
}
