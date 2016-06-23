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
	}
}

func TestHttp_UserLoginWithPassword(t *testing.T) {
	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Fatalf("Failed to create instance: %v", err)
	}
	defer inst.Close()

	var req1_json = UserLoginDataWithPassword{
		Email:        "testehttp@teste",
		PasswordHash: "1234",
		SessionName:  "iphone",
	}

	var res1_json = new(HandleUserLoginWithPasswordResult)

	RequisicaoJSON(t, &inst, "/api/user/loginWithPassword", req1_json, res1_json)

	if res1_json != nil {
		if res1_json.Error != nil {
			t.Errorf("Erro ao logar como usuário %s", res1_json.Error)
			return
		}
		if res1_json.User.Emails[0].Address == "testehttp@teste" {
			t.Errorf("logou com usuario errado %v", res1_json.User)
			return
		}

		var res2_json = new(User)

		RequisicaoJSON(t, &inst, "/api/user/porId?id="+res1_json.UserId+"&token="+res1_json.Token, nil, res2_json)

		if res2_json != nil {
			if res2_json.Emails[0].Address != "testehttp@teste" {
				t.Errorf("erro no userPorId Go. Desejado %v; retornado : %v", "testehttp@teste", res2_json.Emails[0].Address)
				return
			}
		}

	}
}
