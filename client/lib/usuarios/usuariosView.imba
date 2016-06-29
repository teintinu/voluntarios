import application,registerView,dependency from '../../lib/himba'
import lista_usuarios from '../../db/demo'


tag usuariosView
  def render
    <self>
      <div> "teste 2"
      <a href="#/usuarioFormAdd"> "Cadastrar usuário"

  def lista_usuarios
    var filtro = application['searchText']
    var ret = lista_usuarios()
    if filtro
      ret = ret.filterWithRelevance do |v|
        v['nome'].l_relevance(filtro)
    return ret

registerView
  url: '/usuarios'
  render: do |state, params|
    <usuariosView>
