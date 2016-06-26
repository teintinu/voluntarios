
import registerView,dependency,role from '../../lib/himba'
import chartDonut from '../../lib/charts/chartDonut'
import db from '../../db/db.ts'

var dep = dependency()
var count=0
var icons=['star', 'alarm', 'add', 'search', 'home', 'person']

require './home.less'
import anonimoView from './anonimo/aninimoView'
import indicesParticipacaoView from './voluntario/indicesParticipacaoView'
import agendaView from './voluntario/agendaView'

tag homeView < div
  def render
    debugger
    <self.mdl-cell.mdl-cell--12-col.mdl-grid>
      if db['role'].coordenadorDePosto()
        <div> "coordenador"
        <agendaView>
        <indicesParticipacaoView>
      else if db['role'].secretario
        <div> "secretario"
        <agendaView>
        <indicesParticipacaoView>
      else if db['role'].voluntario
        <div> "voluntario"
        <agendaView>
        <indicesParticipacaoView>
      else
        <anonimoView>

registerView
  url: '/'
  render: do |state, params|
    <homeView>

