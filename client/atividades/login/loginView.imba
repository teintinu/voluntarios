
import registerView,dependency from '../../lib/himba'


tag loginView < div
  def render
    <self.mdl-cell.mdl-cell--12-col.mdl-grid>
      "email"
      <input type="text">
      "senha"
      <input type="password">
      <button> "logar"
      <button> "logar pelo facebook"
      <button> "logar pelo google"
      <button> "me cadastrar"
      <button> "esqueci minha senha"

registerView
  url: '/login'
  render: do |state, params|
    <loginView>

