
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
      if db['role']['coordenador']
        <div> "coordenador"
        <agendaView>
        <indicesParticipacaoView>
      else if db['role']['voluntario']
        <div> "voluntario"
        <agendaView>
        <indicesParticipacaoView>
      else
        <div>
          "Você não está logado"
          <button :tap='logAna'> "logar como Ana"

  def logAna
    debugger
    db.loginWithPassword('ana@teste', '123')

registerView
  url: '/'
  render: do |state, params|
    <homeView>

