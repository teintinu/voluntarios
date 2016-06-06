

import h5 from '../h5'

tag appcontent < div
  def render 
    <self.mdl-layout__content.mdl-color--grey-100>
      <div.mdl-grid.demo-content>
        h5['content'].view
