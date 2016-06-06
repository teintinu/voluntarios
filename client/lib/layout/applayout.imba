require './tag_extensions'

require './appheader'
require './appsidebar'
require './appcontent'

import h5 from '../h5'

tag applayout < div
  def render  
    <self.demo-layout.mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer.mdl-layout--fixed-header>
      <appheader>
      <appsidebar>
      <appcontent>
