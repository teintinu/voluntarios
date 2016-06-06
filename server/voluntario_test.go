package cvv

import (
	"net/http/httptest"

	//        "net/http"
	"appengine/aetest"
	"bytes"
	"encoding/json"
	"testing"
)

func TestVoluntarioSave(t *testing.T) {	
	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Fatalf("Failed to create instance: %v", err)
	}
	defer inst.Close()			

	v := Voluntario{
		Nome: "Ana Íres",
		Tipo: "x",
	}

	str, err := json.Marshal(v)
	if err != nil {
		t.Fatalf("Failed to create req1: %v", err)
	}

	r := bytes.NewReader(str)
	req1, err := inst.NewRequest("POST", "/api/voluntario/save", r)
	if err != nil {
		t.Fatalf("Failed to create req1: %v", err)
	}

	resp1 := httptest.NewRecorder()
	HandleVoluntarioSave(resp1, req1)

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
	
	req2, err2 := inst.NewRequest("GET", "/api/voluntario/get?key=" + *key, nil)
	if err2 != nil {
		t.Fatalf("Failed to create req2: %v", err2)
		return
	}

	resp2 := httptest.NewRecorder()
	HandleVoluntarioGet(resp2, req2)

	if resp2.Code != 200 {
		t.Errorf("Got response code %d; want %d; body:\n%s", resp2.Code, 200, resp2.Body.String())
		return
	}

	v2 := new(Voluntario)

	if err := json.NewDecoder(resp2.Body).Decode(v2); err != nil {
		t.Fatal(err)
		return
	}

	if v2.Nome != "Ana Íres" {
		t.Errorf("Got nome %s; want %s", v2.Nome, "Ana Íres")		
	}
}
