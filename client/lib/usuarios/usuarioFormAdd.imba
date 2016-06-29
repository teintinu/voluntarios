import application,registerView,dependency from '../../lib/himba'
import usuarios from './usuarios.css'

tag usuarioFormAdd
  def render
    <self.mdl-layout.mdl-js-layout>
      <div.mdl-grid.mdl-grid--no-spacing.mdl-cell--12-col>
        <div.mdl-card__supporting-text>
          <h4.cadastroDeUsuario-tittle-color> "Cadastro de usuário"
        <div.mdl-card__actions>
          <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
            <input@email.mdl-textfield__input type="text" id="login_email" pattern=RegExp['emailPattern']>
            <label.mdl-textfield__label for="login_email"> "email"
            <span.mdl-textfield__error> "email inválido"
          <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
            <input@senha.mdl-textfield__input type="text" id="login_senha">
            <label.mdl-textfield__label for="login_senha"> "senha"


registerView
  url: '/usuarioFormAdd'
  render: do |state, params|
    <usuarioFormAdd>
