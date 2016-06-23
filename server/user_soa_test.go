package cvv

import (
	"testing"
)

func TestInternal_UserSignUpWithPassword(t *testing.T) {
	var ctx, dados = CriaCenario1(t)
	if ctx != nil {
		assertQryUserPorId(t, ctx, dados.idUsuario, []string{"testesoa@teste"})
		assertQryUserPorEmail(t, ctx, "testesoa@teste", []string{"testesoa@teste"})
	}
}

func TestInternal_UserSignAndLoginUpWithPassword(t *testing.T) {
	var ctx, dados = CriaCenario1(t)
	if ctx != nil {
		assertQryUserPorId(t, ctx, dados.idUsuario, []string{"testesoa@teste"})
		assertQryUserPorEmail(t, ctx, "testesoa@teste", []string{"testesoa@teste"})
	}
}

func assertQryUserPorId(t *testing.T, ctx *Contexto, id string, expected_emails []string) *User {
	var u, err = QryUserPorId(ctx, id)

	if err != nil {
		t.Fatalf("Failed to QryUserPorId: %v", err)
	}

	assertUserEmails(t, "QryUserPorId", u.Emails, expected_emails)
	return u
}

func assertQryUserPorEmail(t *testing.T, ctx *Contexto, email string, expected_emails []string) *User {
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
	return u3
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
