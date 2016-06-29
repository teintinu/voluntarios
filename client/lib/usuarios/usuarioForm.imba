import application,registerView,dependency from '../../lib/himba'
import usuarios from './usuarios.css'
import db from './usuarios.css'

tag usuarioForm

  prop usuario

  def render
    <self.mdl-layout.mdl-shadow--2dp>
      <div.mdl-grid.mdl-cell--12-col>
        <div.mdl-card__supporting-text>
          <h4> "Cadastro de usuário"
        <div.mdl-card__actions>
          <div.mdl-grid>
            <div.mdl-cell--12-col>
              <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.cadastroDeUsuario-inputs>
                <input@senha.mdl-textfield__input type="text" value=usuario['nome']>
                <label.mdl-textfield__label> "Nome"
          <div.mdl-grid>
            <div.mdl-cell--12-col>
              <strong> "Email(s)"
                <a.material-icons> "add"
              <div.mdl-cell--12-col>
                for e in usuario["emails"]
                  <div>
                    <span> e["endereco"]
                    if e['confirmado']
                      <div.icon.material-icons.cadastroDeUsuario-emailConfirmado id=e["endereco"]> "check circle"
                      <div.mdl-tooltip for=e["endereco"]> "Email confirmado"
                    else
                      <div.icon.material-icons.cadastroDeUsuario-emailNaoConfirmado id=e["endereco"]> "feedback"
                      <div.mdl-tooltip for=e["endereco"]> "Email não confirmado"
              # <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label>
              #   <input@email.mdl-textfield__input type="text" id="cadastroDeUsuario_email" pattern=RegExp['emailPattern']>
              #   <label.mdl-textfield__label> "Email"
              #   <span.mdl-textfield__error> "Email inválido"
          <div.mdl-grid>
            <div.mdl-cell--12-col>
              <strong> "Permissões"
              <div.mdl-cell--12-col>
                for r in application.roles
                  if r['title']
                    <label.mdl-checkbox.mdl-js-checkbox.mdl-js-ripple-effect>
                      <input.mdl-checkbox__input type="checkbox" checked=tem_permissao(r)>
                      <span.mdl-checkbox__label> r["title"]

  def tem_permissao r
    debugger
    usuario['roles'].some do | ru |
      ru == r['value']

registerView
  url: '/usuarioForm'
  render: do |state, params|
    var u = {
      nome:"ramon",roles:[2,4],
      emails:[
        {
          endereco: "ramon_henrique34@hotmail.com",
          confirmado: true,
          ativo: true
        },
        {
          endereco: "ramon.ipa2011@gmail.com",
          confirmado: false,
          ativo: false
        }
      ]
    }
    <usuarioForm usuario=u>
