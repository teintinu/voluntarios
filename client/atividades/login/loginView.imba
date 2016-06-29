
import application,registerView,dependency from '../../lib/himba'
import db from '../../db/db.ts'
import login from './login.css'

tag loginView < div
  def render
    if application.logged
      application.navigate('/', )
      <self.mdl-cell.mdl-cell--12-col.mdl-grid>
        "Você está sendo redirecionado para a tela de entrada da aplicação"
    else
      <self.mdl-grid>
        <div.mdl-shadow--2dp>
          <section.section--center.mdl-grid.mdl-grid--no-spacing>
            <header.section__play-btn.mdl-cell.mdl-cell--3-col-desktop.mdl-cell--2-col-tablet.mdl-cell--4-col-phone.mdl-color--teal-100.mdl-color-text--white.login-logo>
              <i.material-icons> "photo_library"
            <div.mdl-card.mdl-cell.mdl-cell--9-col-desktop.mdl-cell--6-col-tablet.mdl-cell--4-col-phone>
              <div.mdl-card__supporting-text>
                <h4.login-tittle-color> "Acesso do Sistema"
                <form action="#">
                  <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
                    <input@email.mdl-textfield__input type="text" id="login_email" pattern=RegExp['emailPattern']>
                    <label.mdl-textfield__label for="login_email"> "email"
                    <span.mdl-textfield__error> "email inválido"
                  <div.mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label.login-inputs>
                    <input@senha.mdl-textfield__input type="text" id="login_senha">
                    <label.mdl-textfield__label for="login_senha"> "senha"
                  <button.mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-button--accent.login-btn-logar :tap="logar" type="submit"> "Acessar"
                  <button.mdl-button.mdl-button--primary> "Esqueci a senha!"
              <div.mdl-card__actions>
                <div.mdl-grid>
                    <div.mdl-cell.mdl-cell--12-col.login-inputs>
                      <button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent.login-btn-facebook>
                        <strong> "Facebook"
                      <button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent.login-btn-google>
                        <strong> "Google"
                      <button.mdl-button.mdl-js-button.mdl-button--raised.login-btn-cadastrar>
                        <strong> "me cadastrar!"

  def logar
    debugger
    db.loginWithPassword(@email.value, @senha.value)

registerView
  url: '/login'
  render: do |state, params|
    <loginView>

