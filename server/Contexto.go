package cvv

import (
	"appengine"
	"net/http"
)

type Contexto struct {
	ctx             appengine.Context
	usuarioLogadoId string
	resume_token    string
}

func CriarContexto(ctx appengine.Context) *Contexto {
	var c = new(Contexto)
	c.ctx = ctx
	return c
}

func ResumeLogin(contexto *Contexto, token string, w http.ResponseWriter) bool {
	var userId, err = QryUserValidaToken(contexto, token)
	if err == nil {
		contexto.usuarioLogadoId = userId
		contexto.resume_token = token
		return true
	}
	http.Error(w, err.Error(), http.StatusInternalServerError)
	return false
}
