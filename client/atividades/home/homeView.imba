
import registerView,dependency from '../../lib/himba'
import statusFacebook,loginFacebook from '../../lib/oauth/facebook_sdk.ts'
import chartDonut from '../../lib/charts/chartDonut'

var dep = dependency()
var count=0
var icons=['star', 'alarm', 'add', 'search', 'home', 'person']

require './home.less'

import indicesParticipacaoView from './indicesParticipacaoView.imba'
import agendaView from './agendaView'

tag homeView < div
  def render
    <self.mdl-cell.mdl-cell--12-col.mdl-grid>
      <agendaView>
      <indicesParticipacaoView>

registerView
  url: '/'
  render: do |state, params|
    <homeView>

