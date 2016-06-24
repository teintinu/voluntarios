
require('../../third/client/imba.js')
import application,autorun,dependency,utils from '../lib/himba.ts'

var mdl_sync
Imba['autorun'] = do |fn|
  autorun do
    var e = fn()
    mdl_sync()

import configRouter from './himbaRouter.ts'

var _layout

export def himbaBoot app
  if app != application
    throw 'missing declareApplication'

  configRouter {
    mode: 'hash'
    root: '/'
    afterExec: do
      # app.revertSearchText();

    onError: do |e|
      app.fatalError(e)
  }

  utils.asap do
    var applayout = require('./layout/applayout')['applayout']
    _layout = <applayout>

    $$(body).append _layout

    mdl_sync

    app.startup()

    _layout

#
var mdl_sync_tm = null

mdl_sync = def mdl_sync
  if mdl_sync_tm
    clearTimeout mdl_sync_tm
  mdl_sync_tm = setTimeout(&, 10) do
    window['componentHandler'].upgradeAllRegistered()


# class HimbaBoot

#   def actions
#     _activity ? _activity['actions'] : []

#   def mainView
#     try
#       _activity ? _activity.view : []
#     catch e
#       <pre>
#         e['stack'] ? e['stack'].toString: e

#   def activity
#     return _activity

#   def navigate url, replace = yes
#     if replace
#       history.replaceState(state,null,href)
#       refresh
#     else
#       history.pushState(state,null,href)

#   def activateUrl url
#     var r = getRoute url

#     if _activity
#       deactivate()

#     if r
#       _activity = r['activity']
#       _activity.dispatch r
#     else
#       _activity = null

#   def activate activityName
#     if _activity
#       deactivate()

#     _activity = himbaActivity.getActivity activityName

#     _activity['state'].on do invalidate
#     invalidate


#   def deactivate
#     _activity['state'].off do invalidate

#   def open_search text
#     if _lastsearch != text
#       _lastsearch = text
#       var found = _app.onSearch text
#       if _activity && _activity['onSearch']
#         found = found.concat(_activity['onSearch'].call(_activity, text))

# export defineModel

# export def defineActivity opts
#   himbaActivity.defineActivity opts


#     # asap do
#     #   window['componentHandler'].upgradeElement(e['_dom'])

