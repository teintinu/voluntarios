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
            <div.mdl-grid.mdl-cell--6-col>
              <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
                <input@senha.mdl-textfield__input type="text" value=usuario['nome']>
                <label.mdl-textfield__label> "Nome"
            <div.mdl-grid.mdl-cell--6-col>
              <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
                <input@email.mdl-textfield__input type="text" id="cadastroDeUsuario_email" pattern=RegExp['emailPattern']>
                <label.mdl-textfield__label> "Email"
                <span.mdl-textfield__error> "Email inválido"
          <div.mdl-grid>
            <div.mdl-grid.mdl-cell--12-col>
              <label> "Permissões"
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
    <usuarioForm usuario={nome:"ramon",roles:[2,4]}>
