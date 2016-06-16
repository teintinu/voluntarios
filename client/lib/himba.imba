
require('./third/imba.js')

var Tracker = require('../lib/himbaTracker.js')
var mdl_sync
Imba['autorun'] = do |fn|
  Tracker.autorun do
    var e = fn()
    mdl_sync()

require('./array_extensions.js')
require('./string_extensions.js')

import defineModel from './himbaModel'
import getRoute from './himbaRouter.js'
var himbaActivity = require('./himbaActivity')

import application from '../lib/mainActivity/himbaAppModel.ts'

var _layout, _activity, _lastsearch, _invalidate_tm

export def asap cb
  setTimeout(cb,1)

class Himba
  def boot app
    if app != application
      throw 'missing declareApplication'
    @dep_title = dependency
    @dep_activity = dependency
    activateUrl null

    asap do
      var applayout = require('./layout/applayout')['applayout']
      _layout = <applayout>

      $$(body).append _layout

      mdl_sync

      _layout

  def actions
    _activity ? _activity['actions'] : []

  def mainView
    try
      _activity ? _activity.view : []
    catch e
      <pre>
        e['stack'] ? e['stack'].toString: e


  def activity
    return _activity

  def navigate url, replace = yes
    if replace
      history.replaceState(state,null,href)
      refresh
    else
      history.pushState(state,null,href)

  def activateUrl url
    var r = getRoute url

    if _activity
      deactivate()

    if r
      _activity = r['activity']
      _activity.dispatch r
    else
      _activity = null

  def activate activityName
    if _activity
      deactivate()

    _activity = himbaActivity.getActivity activityName

    _activity['state'].on do invalidate
    invalidate


  def deactivate
    _activity['state'].off do invalidate

  def open_search text
    if _lastsearch != text
      _lastsearch = text
      var found = _app.onSearch text
      if _activity && _activity['onSearch']
        found = found.concat(_activity['onSearch'].call(_activity, text))

  def dependency
    Tracker['Dependency'].new

  def autorun cb
    Tracker.autorun cb

  def reactiveVar(init)
    var _val = init
    var _dep = dependency
    {
      get: do
        _dep.depend()
        _val
      set: do |value|
        _val = value
        _dep.changed
    }


export defineModel

export def defineActivity opts
  himbaActivity.defineActivity opts

export var himba = window['himba'] = Himba.new

var mdl_sync_tm

mdl_sync = def mdl_sync
  if mdl_sync_tm
    clearTimeout mdl_sync_tm
  mdl_sync_tm = setTimeout(&, 10) do
    window['componentHandler'].upgradeAllRegistered()

    # asap do
    #   window['componentHandler'].upgradeElement(e['_dom'])

