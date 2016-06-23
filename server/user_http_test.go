package cvv

import (
	"appengine/aetest"
	"log"
	"testing"
)

func TestHttp_UserSignUpWithPassword(t *testing.T) {
	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Fatalf("Failed to create instance: %v", err)
	}
	defer inst.Close()

	var req1_json = UserLoginDataWithPassword{
		Email:        "testehttp@teste",
		PasswordHash: "1234",
	}

	var res1_json = new(HandleUserSignUpWithPasswordResult)

	RequisicaoJSON(t, &inst, "/api/user/signupWithPassword", req1_json, res1_json)

	if res1_json != nil {
		if res1_json.Error != nil {
			t.Errorf("Erro ao cadastrar usuário %s", res1_json.Error)
			return
		}
		if res1_json.Id == "" {
			t.Errorf("Nao foi retornado o id do usuário")
			return
		}

		log.Printf("id = %v", res1_json.Id)
		var res2_json = new(User)

		RequisicaoJSON(t, &inst, "/api/user/porId?id="+res1_json.Id, nil, res2_json)

		if res2_json != nil {
			if res2_json.Emails[0].Address != "testehttp@teste" {
				t.Errorf("erro no userPorId Go. Desejado %v; retornado : %v", "testehttp@teste", res2_json.Emails[0].Address)
				return
			}
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
