
import registerView,dependency,role from '../../lib/himba'
import chartDonut from '../../lib/charts/chartDonut'
import db from '../../db/db.ts'
import db from '../../db/db.ts'

var dep = dependency()
var count=0
var icons=['star', 'alarm', 'add', 'search', 'home', 'person']

require './home.less'

import indicesParticipacaoView from './indicesParticipacaoView.imba'
import agendaView from './agendaView'

tag homeView < div
  def render
    <self.mdl-cell.mdl-cell--12-col.mdl-grid>
      if db['role']['coordenador'] || db['role']['coordenador']
        <agendaView>
        <indicesParticipacaoView>
      if db['role']['coordenador']
        <agendaView>
        <indicesParticipacaoView>
      else
        <div> "Você não está logado"

registerView
  url: '/'
  render: do |state, params|
    <homeView>

