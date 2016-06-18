
import registerView,dependency from '../../lib/himba'
import statusFacebook,loginFacebook from '../../lib/oauth/facebook_sdk.ts'

var dep = dependency()
var count=0
var icons=['star', 'alarm', 'add', 'search', 'home', 'person']

tag homeView
  prop state

  def render
    <self>
      <div> 'viewHome cont='  + state.cont()
      <button :tap='inc'> 'inc'
      <p> ' ' + count
      <p>
        getTime

        if statusFacebook()['connected']
          <div>
            "facebook conectado como "
            statusFacebook()['name']
        else
          <button :tap='facebookLogin'> 'facebookLogin'

        <ul.demo-list-three.mdl-list> for x in Array.new(Math.floor(Math.random*3)+2)
          <li.mdl-list__item.mdl-list__item--three-line>
            <span.mdl-list__item-primary-content>
              <i.material-icons.mdl-list__item-avatar> icons.random()
              <span>
                getTime
                Math.random
            <span.mdl-list__item-secondary-content>
              <a.mdl-list__item-secondary-action href="#">
                <i.material-icons> icons.random()

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
