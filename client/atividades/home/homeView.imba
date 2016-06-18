
import registerView,dependency from '../../lib/himba'
import statusFacebook,loginFacebook from '../../lib/oauth/facebook_sdk.ts'
import chartDonut from '../../lib/charts/chartDonut'

var dep = dependency()
var count=0
var icons=['star', 'alarm', 'add', 'search', 'home', 'person']

require './home.css'
import voluntarioLogado from '../../db/db.ts'

tag homeView
  prop state

  def render
    <self.mdl-card.mdl-shadow--2dp.mdl-cell.mdl-cell--12-col.mdl-grid>
      <div.mdl-card__title.mdl-card--expand>
        <div.center-content.mdl-cell.mdl-cell--4-col.mdl-cell>
          <chartDonut size=200
            total=voluntarioLogado()['RG']['realizadas']
            slices=[{donutColor: '#E64A19', textColor: 'black', value: voluntarioLogado()['RG']['presencas']}]>
          <div> "Reuniões de grupo"
        <div.center-content.mdl-cell.mdl-cell--4-col.mdl-cell>
          <chartDonut
            size=200
            total=voluntarioLogado()['RG']['realizadas']
            slices=[{donutColor: '#2E7D32', textColor: 'black', value: voluntarioLogado()['RG']['atendimentos']}]>
          <span> "Atendimentos"
        <div.center-content.mdl-cell.mdl-cell--4-col.mdl-cell>
          <chartDonut size=200
            total=voluntarioLogado()['RGV']['realizadas']
            slices=[
              {donutColor: '#1A237E', textColor: 'black', value: voluntarioLogado()['RGV']['presencas']}
            ]
          >
          <span> "RGV's"
      <div.mdl-card__actions.mdl-card--border>
          <span> "Presença nas reuniões de grupo"

  def facebookLogin
    loginFacebook()

  def inc
    state.inc()

  def getTime
    dep.depend
    Date.new.getTime.toString

# tracker1.autorun do
#   window['himba'] && window['himba'].invalidate

setInterval(&, 3701) do
  count++
  if (Math.floor(count / 10000) % 2)==0
    dep.changed

registerView
  url: '/'
  render: do |state, params|
    <homeView state=state>

