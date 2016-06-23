package cvv

import (
	"appengine"
)

type Contexto struct {
	ctx           appengine.Context
	usuarioLogado *User
}

func CriarContexto(ctx appengine.Context) *Contexto {
	var c = new(Contexto)
	c.ctx = ctx
	return c
}
