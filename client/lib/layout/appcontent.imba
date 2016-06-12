

import himba from '../himba'

tag appcontent < div
  def render 
    <self.mdl-layout__content.mdl-color--grey-100>
      <div.mdl-grid.demo-content>
        himba.mainView
