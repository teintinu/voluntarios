package cvv

import (
	"appengine/aetest"
	"testing"
)

func TestHttp_UserSignUpWithPassword(t *testing.T) {
	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Fatalf("Failed to create instance: %v", err)
	}
	defer inst.Close()

	var req_json = UserLoginDataWithPassword{
		Email:        "testehttp@teste",
		PasswordHash: "1234",
	}

	var res_json = new(HandleUserSignUpWithPasswordResult)

	RequisicaoJSON(t, &inst, "/api/user/signupWithPassword", req_json, res_json)

	if res_json != nil {
		if res_json.Error != nil {
			t.Errorf("Erro ao cadastrar usuário %s", res_json.Error)
			return
		}
		if res_json.Id == "" {
			t.Errorf("Nao foi retornado o id do usuário")
			return
		}

		// req2, err2 := inst.NewRequest("GET", "/api/user/get?key="+*key, nil)
		// if err2 != nil {
		// 	t.Fatalf("Failed to create req2: %v", err2)
		// 	return
		// }

		// resp2 := httptest.NewRecorder()
		// HandleUserGet(resp2, req2)

		// if resp2.Code != 200 {
		// 	t.Errorf("Got response code %d; want %d; body:\n%s", resp2.Code, 200, resp2.Body.String())
		// 	return
		// }

		// u2 := new(User)

		// if err := json.NewDecoder(resp2.Body).Decode(u2); err != nil {
		// 	t.Fatal(err)
		// 	return
		// }

		// if u2.Emails[0].Address != "testehttp@teste" {
		// 	t.Errorf("Got nome %s; want %s", u2.Emails[0].Address, "testehttp@teste")
		// }
	}
}
