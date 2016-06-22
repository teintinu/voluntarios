package cvv

import (
	"appengine"
	"appengine/aetest"
	"appengine/datastore"
	"testing"
	// "net/http/httptest"
	// "encoding/json"
	// "bytes"
)

func TestSoaUserSignUpWithPassword(t *testing.T) {
	var ctx, dados = cenario1(t)
	if ctx != nil {
		assertQryUserPorId(t, ctx, dados.idUsuario, []string{"testesoa@teste"})
		assertQryUserPorEmail(t, ctx, "testesoa@teste", []string{"testesoa@teste"})
	}
}

type Cenario1 struct {
	idUsuario string
}

func cenario1(t *testing.T) (ctx appengine.Context, cenario *Cenario1) {
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
		ctx = nil
	}

	cenario = new(Cenario1)
	cenario.idUsuario = key.String()
	return
}

// func xTestSoaUserSignUpWithPassword2(t *testing.T) {
// 	ctx, err := aetest.NewContext(nil)
// 	if err != nil {
// 		t.Fatal(err)
// 	}

// 	// login := UserLoginDataWithPassword{
// 	//   Email:        "testesoa@teste",
// 	//   PasswordHash: "1234",
// 	// }

// 	// var key *datastore.Key
// 	// key, err = UserOpSignUpWithPassword(ctx, &login)
// 	// if err != nil {
// 	//   t.Fatalf("Failed to UserOpSave: %v", err)
// 	// }

// 	// assertQryUserPorId(t, ctx, key.String(), []string{"testesoa@teste"})
// 	assertQryUserPorEmail(t, ctx, "testesoa@teste", []string{"testesoa@teste"})
// }

func assertQryUserPorId(t *testing.T, ctx appengine.Context, id string, expected_emails []string) {
	var u, err = QryUserPorId(ctx, id)

	if err != nil {
		t.Fatalf("Failed to QryUserPorId: %v", err)
	}

	assertUserEmails(t, "QryUserPorId", u.Emails, expected_emails)
}

func assertQryUserPorEmail(t *testing.T, ctx appengine.Context, email string, expected_emails []string) {
	var u3key, u3, err = QryUserPorEmail(ctx, "testesoa@teste", false, false)

	if err != nil {
		t.Fatalf("Failed to QryUserPorEmail: %v", err)
	}

	if u3key == nil {
		t.Fatal("Failed to QryUserPorEmail: u3key=nil")
	}
	if u3 == nil {
		t.Fatal("Failed to QryUserPorEmail: u3=nil")
	}

	assertUserEmails(t, "QryUserPorEmail", u3.Emails, expected_emails)
}

func assertUserEmails(t *testing.T, title string, user_emails []UserEmail, expected_emails []string) {
	if len(user_emails) != len(expected_emails) {
		t.Errorf(": encontrado '%v' deveria ser '%v'", user_emails, expected_emails)
	} else {
		for i, v := range expected_emails {
			if user_emails[i].Address != v {
				t.Errorf(": encontrado '%v' deveria ser '%v'", user_emails, expected_emails)
				return
			}
		}
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
