package cvv

import (
	"appengine/aetest"
	"appengine/datastore"
	"testing"
	// "net/http/httptest"
	// "encoding/json"
	// "bytes"
)

func TestSoaUserSignUpWithPassword(t *testing.T) {
	ctx, err := aetest.NewContext(nil)
	if err != nil {
		t.Fatal(err)
	}

	login := UserLoginDataWithPassword{
		Email:        "testesoa@teste",
		PasswordHash: "1234",
	}

	var key *datastore.Key
	key, err = UserOpSignUpWithPassword(ctx, &login)
	if err != nil {
		t.Fatalf("Failed to UserOpSave: %v", err)
	}

	var u2 User
	u2, err = QryUserPorId(ctx, key.String())

	if err != nil {
		t.Fatalf("Failed to QryUserPorId: %v", err)
	}

	if u2.Emails[0].Address != "testesoa@teste" {
		t.Errorf("QryUserPorId: encontrado '%s' deveria ser '%s'", u2.Emails[0].Address, "testesoa@teste")
	}

	var u3 *User
	var u3key *datastore.Key
	u3key, u3, err = QryUserPorEmail(ctx, "testesoa@teste", false, false)

	if err != nil {
		t.Fatalf("Failed to QryUserPorEmail: %v", err)
	}

	if u3key == nil {
		t.Fatal("Failed to QryUserPorEmail: u3key=nil")
	}
	if u3 == nil {
		t.Fatal("Failed to QryUserPorEmail: u3=nil")
	}

	if u3key.String() != key.String() {
		t.Errorf("QryUserPorEmail: key encontrado '%s' deveria ser '%s'", u3key, key)
	}
	if u3.Emails[0].Address != "testesoa@teste" {
		t.Errorf("QryUserPorEmail: email encontrado '%s' deveria sre '%s'", u3.Emails[0].Address, "testesoa@teste")
	}
}

// func TestHttpUserSave(t *testing.T) {
// 	inst, err := aetest.NewInstance(nil)
// 	if err != nil {
// 		t.Fatalf("Failed to create instance: %v", err)
// 	}
// 	defer inst.Close()

// 	v := User{
// 		Emails: []UserEmail{
// 			UserEmail{
// 				Address:  "testehttp@teste",
// 				Verified: true,
// 				Active:   true,
// 			},
// 		},
// 		roles: []string{"root"},
// 	}

// 	str, err := json.Marshal(v)
// 	if err != nil {
// 		t.Fatalf("Failed to create req1: %v", err)
// 	}

// 	r := bytes.NewReader(str)
// 	req1, err := inst.NewRequest("POST", "/api/user/save", r)
// 	if err != nil {
// 		t.Fatalf("Failed to create req1: %v", err)
// 	}

// 	resp1 := httptest.NewRecorder()
// 	HandleUserSave(resp1, req1)

// 	if resp1.Code != 200 {
// 		t.Errorf("Got response code %d; want %d; body:\n%s", resp1.Code, 200, resp1.Body.String())
// 		return
// 	}

// 	key := new(string)

// 	if err := json.NewDecoder(resp1.Body).Decode(key); err != nil {
// 		t.Error(err)
// 		return
// 	}

// 	if *key == "" {
// 		t.Errorf("Key expected")
// 		return
// 	}

// 	req2, err2 := inst.NewRequest("GET", "/api/user/get?key="+*key, nil)
// 	if err2 != nil {
// 		t.Fatalf("Failed to create req2: %v", err2)
// 		return
// 	}

// 	resp2 := httptest.NewRecorder()
// 	HandleUserGet(resp2, req2)

// 	if resp2.Code != 200 {
// 		t.Errorf("Got response code %d; want %d; body:\n%s", resp2.Code, 200, resp2.Body.String())
// 		return
// 	}

// 	u2 := new(User)

// 	if err := json.NewDecoder(resp2.Body).Decode(u2); err != nil {
// 		t.Fatal(err)
// 		return
// 	}

// 	if u2.Emails[0].Address != "testehttp@teste" {
// 		t.Errorf("Got nome %s; want %s", u2.Emails[0].Address, "testehttp@teste")
// 	}
// }
