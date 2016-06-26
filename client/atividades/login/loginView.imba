
import application,registerView,dependency from '../../lib/himba'
import db from '../../db/db.ts'

tag loginView < div
  def render
    if application.logged
      application.navigate('/', )
      <self.mdl-cell.mdl-cell--12-col.mdl-grid>
        "Você está sendo redirecionado para a tela de entrada da aplicação"
    else
      <self.mdl-cell.mdl-cell--12-col.mdl-grid>
        "email"
        <input@email type="text">
        "senha"
        <input@senha type="password">
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

