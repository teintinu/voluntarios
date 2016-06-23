package cvv

import (
	"appengine"
	"net/http"
)

func HandleQryUserPorId(w http.ResponseWriter, r *http.Request) {
	var ctx = CriarContexto(appengine.NewContext(r))
	if ResumeLogin(ctx, r.URL.Query().Get("token"), w) {

		var key = r.URL.Query().Get("id")
		var user, err = QryUserPorId(ctx, key)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		stringifyJsonToResponse(r, w, user)
	}
}

type HandleUserSignUpWithPasswordResult struct {
	Error error
	Id    string
}

func HandleUserSignupWithPassword(w http.ResponseWriter, r *http.Request) {
	var ctx = CriarContexto(appengine.NewContext(r))
	var login = new(UserLoginDataWithPassword)
	if parseJsonFromRequest(r, w, login) {
		key, err := UserOpSignUpWithPassword(ctx, login)

		var result HandleUserSignUpWithPasswordResult
		result.Error = err
		if err == nil {
			result.Id = key.String()
		}
		stringifyJsonToResponse(r, w, result)
	}
}

type HandleUserLoginWithPasswordResult struct {
	Error error
	User  User
	Token string
}

func HandleUserLoginWithPassword(w http.ResponseWriter, r *http.Request) {
	var ctx = CriarContexto(appengine.NewContext(r))
	var login = new(UserLoginDataWithPassword)
	if parseJsonFromRequest(r, w, login) {
		err := UserOpLoginWithPassword(ctx, login)

		var result HandleUserLoginWithPasswordResult
		result.Error = err
		if err == nil {
			var user *User
			user, err = QryUserPorId(ctx, ctx.usuarioLogadoId)
			if err == nil {
				result.User = *user
				result.Token = ctx.resume_token
			}
		}
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		} else {
			stringifyJsonToResponse(r, w, result)
		}
	}
}

type HandleUserLogoutResult struct {
	Ok bool
}

func HandleUserLogout(w http.ResponseWriter, r *http.Request) {
	var ctx = CriarContexto(appengine.NewContext(r))

	var token = r.URL.Query().Get("token")

	UserOpLogout(ctx, token)

	var result HandleUserLogoutResult
	result.Ok = true
	stringifyJsonToResponse(r, w, result)

}
