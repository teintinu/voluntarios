

import application from '../himba'

tag appcontent < div
  def render
    <self.mdl-layout__content.mdl-color--grey-100>
      <div.mdl-demo.mdl-grid>
        application.content
