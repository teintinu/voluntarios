
import application,registerView,dependency from '../../lib/himba'
import db from '../../db/db.ts'

tag loginView < div
  def render
    if application.logged
      application.navigate('/', )
      <self.mdl-cell.mdl-cell--12-col.mdl-grid>
        "Você está sendo redirecionado para a tela de entrada da aplicação"
    else
      <self.mdl-grid.mdl-grid--no-spacing.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col>
        <div.mdl-card.mdl-cell.mdl-cell--12-col>
          <div.mdl-card__supporting-text.mdl-grid.mdl-grid--no-spacing>
            <h4.mdl-cell.mdl-cell--12-col>
              "Acesso ao sistema"
          <form action="#">
            <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label>
              <input@email.mdl-textfield__input type="text" id="login_email" pattern=RegExp['emailPattern']>
              <label.mdl-textfield__label for="login_email"> "email"
              <span.mdl-textfield__error> "email inválido"
            <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label>
              <input@senha.mdl-textfield__input type="text" id="login_senha">
              <label.mdl-textfield__label for="login_senha"> "senha"

        <div>
          <button :tap="logar"> "logar"
          <button> "logar pelo facebook"
          <button> "logar pelo google"
          <button> "me cadastrar"
          <button> "esqueci minha senha"

  def logar
    debugger
    db.loginWithPassword(@email.value, @senha.value)

registerView
  url: '/login'
  render: do |state, params|
    <loginView>

