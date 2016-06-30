

import application from '../himba'
import appcontentstyle from './appcontent.css'

tag appcontent < div
  def render
    <self.mdl-layout__content.mdl-color--grey-100>
      <div.mdl-demo.mdl-grid>
        application.content
        if tem_fab()
          <button.mdl-button.mdl-js-button.mdl-button--fab.mdl-js-ripple-effect.mdl-button--colored.appContent-fab>
            <i.material-icons> "add"
  def tem_fab
    application.actions.some do | a |
      a["fab"] && a.fab == true
